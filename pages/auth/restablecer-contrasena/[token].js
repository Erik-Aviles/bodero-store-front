import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Layout from "@/components/Layout";
import { Loading } from "@/components/Loading";
import styled, { css } from "styled-components";
import Title from "@/components/stylesComponents/Title";
import "react-datepicker/dist/react-datepicker.css";
import { CenterSecction } from "@/components/stylesComponents/CenterSecction";
import { blue, error, greylight, primary, warning, white } from "@/lib/colors";
import InputGroup from "@/components/Account/forms/InputGroup";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  Button,
  ComponenteLink,
  RequiredText,
  Wrapper,
} from "@/components/stylesComponents/ComponentAccount";
import axios from "axios";

const fieldLabels = {
  password: "Contraseña nueva",
  confirmpassword: "Repetir contraseña",
};

const CenterDiv = styled.section`
  padding-bottom: 20px;
  ${CenterSecction}
`;

const DivTitle = styled.div`
  margin-bottom: 10px;
  padding: 0 20px 20px;
  border-bottom: 1px solid ${greylight};
  @media screen and (min-width: 768px) {
    padding: 0;
  }
  @media screen and (min-width: 1024px) {
    text-align: center;
  }
`;

const Box = styled.section`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 20px;
  letter-spacing: normal;
  height: fit-content;
  padding: 15px;
  .div-action {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.8rem;
    color: #9199a0;
  }
  strong {
    font-weight: 400;
    color: #0033a0;
  }
  p {
    font-size: 12px;
  }
  fieldset {
    border: none;
    margin: 0;
    padding: 0;
  }
  legend {
    border-bottom: 1px solid #efedef;
    padding-bottom: 10px;
  }

  @media screen and (min-width: 768px) {
    padding: 10px 40px;
    p {
      font-size: 14px;
    }
  }
`;
const InnerBox = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  width: 100%; /* Ajusta según tus necesidades */
`;

export default function ResetPasswordPage() {
  const router = useRouter();
  const query = router.query;
  const { status } = useSession();
  const [errorNotification, setErrorNotification] = useState("");
  const [showLink, setShowLink] = useState(false);
  const [verified, setVerified] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [formData, setFormData] = useState({
    password: "",
    confirmpassword: "",
  });

  useEffect(() => {
    let mounted = true;
    const verifyToken = async () => {
      try {
        if (!query?.token) {
          setErrorNotification("El token es requerido.");
          setVerified(false);
          return;
        }
        const res = await axios.post("/api/auth/verify-token", {
          token: query.token,
        });

        if (mounted && res.status === 200) {
          setErrorNotification("");
          setVerified(true);
          setCustomer(res?.data?.customer);
        }
      } catch (error) {
        if (mounted) {
          if (error.response?.status === 401) {
            // Si el token es inválido o ha expirado
            setErrorNotification(error.response?.data?.message);
          } else {
            // Para otros errores
            setErrorNotification(
              "Algo salió mal. Por favor, inténtalo más tarde."
            );
          }
          setVerified(true);
          setShowLink(true);
        }
      }
    };
    verifyToken();

    return () => {
      mounted = false; // Cleanup para evitar condiciones de carrera
    };
  }, [query?.token]);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (formData[name] === value) return;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrorNotification("");
    setShowLink(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar contraseñas antes de enviar la solicitud
    if (!formData?.password || !formData?.confirmpassword) {
      setErrorNotification("Por favor, completa ambos campos de contraseña.");
      return;
    }

    if (formData.password !== formData.confirmpassword) {
      setErrorNotification("Las contraseñas no coinciden.");
      return;
    }
    try {
      const res = await axios.post("/api/auth/reset-password", {
        email: customer?.email,
        password: formData?.password,
        confirmpassword: formData?.confirmpassword,
      });

      if (res.status === 200) {
        setErrorNotification("");
        const Toast = Swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Cambio exito",
        });

        router.push("/auth/inicio-sesion");
        return;
      }
    } catch (error) {
      console.error("Error en el restablecimiento de contraseña:", error);
      setErrorNotification(
        error?.response?.data?.message ||
          "Algo salió mal!. Por favor, inténtalo más tarde."
      );
      setShowLink(true);
    }
  };

  if (status === "loading" || !verified) {
    return <Loading />;
  }

  return (
    <Layout
      title="B.R.D | Recuperar Contraseña"
      sity={"/auth/restablecer-contrasena"}
    >
      {status !== "authenticated" && (
        <CenterDiv>
          <DivTitle>
            <Title>Restablecer Contraseña</Title>
            <RequiredText>(*) Datos Obligatorios</RequiredText>
          </DivTitle>
          <Box>
            <strong>Registra una nueva contraseña.</strong>
            <InnerBox onSubmit={handleSubmit}>
              <Container>
                <>
                  <InputGroup
                    required
                    name="password"
                    label={fieldLabels.password}
                    type={fieldLabels.password}
                    value={formData?.password}
                    onChange={handleChange}
                    placeholder="Escribe la nueva contraseña "
                  />
                  <InputGroup
                    required
                    name="confirmpassword"
                    label={fieldLabels.confirmpassword}
                    type={fieldLabels.confirmpassword}
                    value={formData?.confirmpassword}
                    onChange={handleChange}
                    placeholder="Repite la nueva contraseña "
                  />
                </>
              </Container>
              <Wrapper>
                <RequiredText>
                  {errorNotification && errorNotification}
                </RequiredText>
                {showLink && (
                  <ComponenteLink href="/auth/recuperar-contrasena">
                    Volver a recuperar contraseña?
                  </ComponenteLink>
                )}
              </Wrapper>
              <Button
                $blue
                type="submit"
                title="Restablecer Contraseña"
                disabled={errorNotification.length > 0}
              >
                Restablecer Contraseña
              </Button>
            </InnerBox>
          </Box>
        </CenterDiv>
      )}
    </Layout>
  );
}
