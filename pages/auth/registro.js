import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import styled, { css } from "styled-components";
import Title from "@/components/stylesComponents/Title";
import "react-datepicker/dist/react-datepicker.css";
import { CenterSecction } from "@/components/stylesComponents/CenterSecction";
import { greylight, primary, white } from "@/lib/colors";
import { genersData } from "@/resource/curtomerData";
import InputGroup from "@/components/Account/forms/InputGroup";
import DateInputGroup from "@/components/Account/forms/DateInputGroup";
import { useRouter } from "next/router";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { Loading } from "@/components/Loading";
import { RequiredText } from "@/components/stylesComponents/ComponentAccount";

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

const ColumnsFormWrapper = styled.form`
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 1024px) {
    margin: 0 120px;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-bottom: 1px solid #efedef;
  margin-bottom: 20px;
  padding-bottom: 20px;
  letter-spacing: normal;
  height: fit-content;
  padding: 15px;
  strong {
    font-weight: 400;
    color: #0033a0;
  }

  &:nth-child(2) {
    padding-top: 0;
  }
  legend {
    padding-bottom: 10px;
    border-bottom: 1px solid #efedef;
  }
  fieldset {
    border: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
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

const Button = styled.button`
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
  background-color: ${primary};
  color: ${white};
  border: 1px solid ${primary};
  &:hover {
    background-color: transparent;
    color: ${primary};
    border: 1px solid ${primary};
  }
`;

export default function RegisterPage() {
  const { status } = useSession();
  const router = useRouter();
  const { callbackUrl } = router.query;

  const [errorNotification, setErrorNotification] = useState("");
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const [isVisiblePassConfirm, setIsVisiblePassConfirm] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    idDocument: "",
    gender: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const fieldLabels = {
    name: "Nombres",
    lastname: "Apellidos",
    dateOfBirth: "Fecha de nacimiento",
    email: "Correo",
    idDocument: "Documento de identidad",
    gender: "Genero",
    phone: "Teléfono",
    password: "Contraseña",
    confirmPassword: "Confirmar Contraseña",
  };

  useEffect(() => {
    if (status === "authenticated" && !callbackUrl) {
      router.push("/customer/mi-cuenta/general");
    }
  }, [status, router, callbackUrl]);

  const toggleVisibilityPassword = () => setIsVisiblePass((prev) => !prev);
  const toggleVisibilityConfirmPassword = () =>
    setIsVisiblePassConfirm((prev) => !prev);

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
      const formattedDate = selectedDate?.toISOString().split("T")[0];
      const signupResponse = await axios.post("/api/auth/register", {
        ...formData,
        dateOfBirth: formattedDate,
      });

      if (signupResponse.status === 201) {
        const res = await signIn("credentials", {
          email: signupResponse.data?.customer?.email,
          password: formData.password,
          redirect: false,
        });
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
          title: signupResponse?.data?.message,
        });

        if (res?.ok) {
          if (callbackUrl) {
            return router.push(callbackUrl);
          } else {
            return router.push("/customer/mi-cuenta/general");
          }
        }
      }
    } catch (error) {
      setErrorNotification(error?.response?.data?.message || "Algo salió mal!");
    }
  };

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <Layout title="B.R.D | Nueva Cuenta" sity={"/auth/registro"}>
      {status !== "authenticated" && (
        <CenterDiv>
          <DivTitle>
            <Title>Crear una nueva cuenta</Title>
            <RequiredText>(*) Datos Obligatorios</RequiredText>
          </DivTitle>
          <ColumnsFormWrapper onSubmit={handleSubmit}>
            <Box>
              <legend>
                <strong>Información Personal</strong>
              </legend>
              <RequiredText $error={errorNotification !== ""}>
                {errorNotification && errorNotification}
              </RequiredText>
              <fieldset>
                <InputGroup
                  required
                  label={fieldLabels.name}
                  name="name"
                  value={formData?.name}
                  onChange={handleChange}
                  placeholder="Ingresa tu nombre"
                />

                <InputGroup
                  required
                  label={fieldLabels.lastname}
                  name="lastname"
                  value={formData?.lastname}
                  onChange={handleChange}
                  placeholder="Ingresa tu apellido"
                />
                <DateInputGroup
                  label={fieldLabels.dateOfBirth}
                  name="dateOfBirth"
                  selectedDate={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholder="DD/MM/AAAA"
                />
                <InputGroup
                  required
                  label={fieldLabels.idDocument}
                  name="idDocument"
                  value={formData?.idDocument}
                  onChange={handleChange}
                  placeholder="Ingresa tu DI"
                />
                <InputGroup
                  type="tel"
                  label={fieldLabels.phone}
                  name="phone"
                  value={formData?.phone}
                  onChange={handleChange}
                  placeholder="Ingresa tu número de contacto"
                />

                <InputGroup
                  as="select"
                  name="gender"
                  label={fieldLabels.gender}
                  value={formData?.gender}
                  onChange={handleChange}
                  options={genersData.map((gener) => ({
                    value: gener.name,
                    name: gener.name,
                  }))}
                />
              </fieldset>
            </Box>
            <Box>
              <legend>
                <strong>Información de inicio de sesión</strong>
              </legend>
              <RequiredText $error={errorNotification !== ""} $movil>
                {errorNotification && errorNotification}
              </RequiredText>
              <fieldset>
                <InputGroup
                  required
                  name="email"
                  label={fieldLabels.email}
                  type="email"
                  value={formData?.email}
                  onChange={handleChange}
                  placeholder="Ingresa un correo válido"
                />

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
                  placeholder="*******"
                />

                <InputGroup
                  required
                  name="confirmPassword"
                  label={fieldLabels.confirmPassword}
                  isPassword
                  isVisiblePass={isVisiblePassConfirm}
                  type={isVisiblePassConfirm ? "text" : "password"}
                  value={formData?.confirmPassword}
                  onChange={handleChange}
                  toggleVisibility={toggleVisibilityConfirmPassword}
                  placeholder="Repetir contraseña"
                />
              </fieldset>
            </Box>
            <div></div>
            <Button type="submit" $primary title="Iniciar Sesión">
              ENVIAR
            </Button>
          </ColumnsFormWrapper>
        </CenterDiv>
      )}
    </Layout>
  );
}
