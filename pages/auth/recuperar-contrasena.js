import { useState } from "react";
import Swal from "sweetalert2";
import Layout from "@/components/Layout";
import styled from "styled-components";
import Title from "@/components/stylesComponents/Title";
import "react-datepicker/dist/react-datepicker.css";
import { CenterSecction } from "@/components/stylesComponents/CenterSecction";
import { greylight, white } from "@/lib/colors";
import InputGroup from "@/components/Account/forms/InputGroup";
import { useRouter } from "next/router";
import {
  ComponenteLink,
  RequiredText,
} from "@/components/stylesComponents/ComponentAccount";
import axios from "axios";
import { VerifyIcon } from "@/components/Icons";

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
  gap: 5px;
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
  position: relative;
  width: 100%; /* Ajusta según tus necesidades */
`;
const WrapperMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px;
  margin: 0 auto;
  width: 300px;
  svg {
    width: 60px;
    height: 60px;
  }
  p {
    text-align: center;
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
  background-color: #013c92;
  color: ${white};
  border: 1px solid #013c92;
  &:hover {
    background-color: transparent;
    color: #013c92;
    border: 1px solid #013c92;
  }
`;

export default function RecoverPasswordPage() {
  const router = useRouter();
  const [errorNotification, setErrorNotification] = useState("");
  const [send, setSend] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const fieldLabels = {
    email: "Correo electrónico registrado",
  };

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
      const response = await axios.post("/api/auth/forget-password", {
        email: formData?.email,
      });
      console.log(response.data);
      if (response.status === 400) {
        setErrorNotification(
          response?.message || "Error en los datos proporcionados"
        );
      }

      if (response.status === 200) {
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
          title:
            response?.data?.message || "Redirigiendo a inicio de sesión...",
        });

        setSend(true);
      }
    } catch (error) {
      setErrorNotification(error?.response?.data?.message || "Algo salió mal!");
    }
  };

  return (
    <Layout
      title="B.R.D | Recuperar Contraseña"
      sity={"/auth/recuperar-contrasena"}
    >
      <CenterDiv>
        {!send ? (
          <>
            <DivTitle>
              <Title>Recuperar Contraseña</Title>
              <RequiredText>(*) Datos Obligatorios</RequiredText>
            </DivTitle>
            <Box>
              <legend>
                <strong>¿Olvidaste tu contraseña?</strong>
              </legend>
              <p>
                Por favor ingrese su dirección de correo electrónico registrado.
                Recibirá un enlace para restablecer su contraseña.
              </p>
              <InnerBox onSubmit={handleSubmit}>
                <Container>
                  <InputGroup
                    required
                    name="email"
                    label={fieldLabels.email}
                    type="email"
                    value={formData?.email}
                    onChange={handleChange}
                    placeholder="Ingresa tu correo"
                  />
                </Container>
                <RequiredText>
                  {errorNotification && errorNotification}
                </RequiredText>

                <DivButton type="submit" title="Recuperar Contraseña">
                  ENVIAR
                </DivButton>
                <div className="div-action">
                  <span> ¿No tienes una cuenta?</span>
                  <ComponenteLink
                    href={"/auth/registro"}
                    title="¿No tienes una cuenta?"
                  >
                    Registrate aqui
                  </ComponenteLink>
                </div>
              </InnerBox>
            </Box>{" "}
          </>
        ) : (
          <WrapperMessage>
            <VerifyIcon />
            <p>
              Dirigete a la bandeja de entrada del correo registrado y has click
              en el enlace que te hemos enviado.
            </p>
          </WrapperMessage>
        )}
      </CenterDiv>
    </Layout>
  );
}
