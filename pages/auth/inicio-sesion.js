import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import styled, { css } from "styled-components";
import Title from "@/components/stylesComponents/Title";
import { CenterSecction } from "@/components/stylesComponents/CenterSecction";
import { greylight, primary, secondary, white } from "@/lib/colors";
import Link from "next/link";
import InputGroup from "@/components/Account/forms/InputGroup";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { Loading } from "@/components/Loading";
import { Button, ComponenteLink, RequiredText } from "@/components/stylesComponents/ComponentAccount";

const CenterDiv = styled.section`
  ${CenterSecction}
`;

const DivTitle = styled.div`
  margin-bottom: 10px;
  padding: 0 20px 20px;
  border-bottom: 1px solid ${greylight};

  span {
    color: ${primary};
    font-size: 12px;
  }

  @media screen and (min-width: 768px) {
    padding: 0;
  }
  @media screen and (min-width: 1024px) {
    text-align: center;
  }
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 1024px) {
    margin: 0 120px;
  }
`;

const Box = styled.section`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #efedef;
  margin-bottom: 20px;
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
  &:nth-child(2) {
    padding-top: 0;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  fieldset {
    border: none;
    margin: 0;
    padding: 0;
  }

  @media screen and (min-width: 768px) {
    border-bottom: none;
    margin-bottom: none;
    padding: 10px 40px;
    &:first-child {
      border-right: 1px solid ${greylight};
    }
    &:nth-child(2) {
      padding-top: 10px;
    }
  }
`;
const DivButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin: 0 auto;
  padding: 8px;
  width: 300px;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  ${(props) =>
    props.$primary &&
    css`
      background-color: ${primary};
      color: ${white};
      border: 1px solid ${primary};
      &:hover {
        background-color: transparent;
        color: ${primary};
        border: 1px solid ${primary};
      }
    `};
  ${(props) =>
    props.$secondary &&
    css`
      background-color: ${secondary};
      color: ${white};
      border: 1px solid ${secondary};
      &:hover {
        background-color: transparent;
        color: ${secondary};
      }
    `};
`;
const TextLink = styled(Link)`
  width: fit-content;
  font-size: 0.8rem;
  color: #2255c2;
  cursor: pointer;
  &:hover {
    text-decoration-line: underline;
  }
`;

export default function LoginPage() {
  const router = useRouter();
  const { status } = useSession();
  const [errorNotification, setErrorNotification] = useState("");
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const fieldLabels = {
    email: "Correo electrónico",
    password: "Contraseña",
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const toggleVisibilityPassword = () => setIsVisiblePass((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (formData[name] === value) return;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrorNotification("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email: formData?.email,
        password: formData?.password,
        redirect: false,
      });

      if (res?.status === 401 || res?.error) {
        setErrorNotification(res?.error);
      }
      if (res?.status === 201) {
        setErrorNotification(res?.error);
      }

      if (res?.ok) {
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
          title: "Bienvenid@ a tu cuenta",
        });
        return router.push("/");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message || "Algo salió mal!",
      });
      return;
    }
  };

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <Layout title="B.R.D | Iniciar Sesión" sity={"/auth/inicio-sesion"}>
      {status !== "authenticated" && (
        <CenterDiv>
          <DivTitle>
            <Title>Iniciar sesión o crear una cuenta</Title>
            <RequiredText>(*) Datos Obligatorios</RequiredText>
          </DivTitle>
          <ColumnsWrapper>
            <Box>
              <strong>¿Estás registrado?</strong>
              <p>Por favor completa tus datos para iniciar sesión.</p>
              <form onSubmit={handleSubmit}>
                <fieldset>
                  <InputGroup
                    required
                    name="email"
                    label={fieldLabels.email}
                    type="email"
                    value={formData?.email}
                    onChange={handleChange}
                    placeholder="Ingresa tu correo"
                  />
                </fieldset>
                <fieldset>
                  <InputGroup
                    required
                    name="password"
                    label={fieldLabels.password}
                    isPassword
                    isVisiblePass={isVisiblePass}
                    type={isVisiblePass ? "text" : "password"}
                    value={formData?.password}
                    onChange={handleChange}
                    toggleVisibility={toggleVisibilityPassword}
                    placeholder="Ingresa tu contraseña"
                  />
                </fieldset>
                <RequiredText>
                  {errorNotification ? errorNotification : " "}
                </RequiredText>
                <div className="div-action">
                  <span> ¿Olvidó su contraseña?</span>
                  <ComponenteLink
                    href={"/auth/recuperar-contrasena"}
                    title="¿Olvidó su contraseña?"
                  >
                    Recuperla aqui
                  </ComponenteLink>
                </div>
                <Button $red title="Iniciar Sesión" type="submit">
                  INICIAR SESIÓN
                </Button>
              </form>
            </Box>
            <Box>
              <strong>¿Aún no tienes cuenta?</strong>
              <p>
                Al crear una cuenta en nuestra tienda, podrás ver e informarte
                sobre los pedidos de tu cuenta y su estado.
              </p>
              <Button $green title="Crear una cuenta">
                <Link href={"/auth/registro"}>CREAR UNA CUENTA</Link>
              </Button>
            </Box>
          </ColumnsWrapper>
        </CenterDiv>
      )}
    </Layout>
  );
}
