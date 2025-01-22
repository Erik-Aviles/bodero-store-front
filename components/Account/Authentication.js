import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import InputGroup from "./forms/InputGroup";
import {
  Button,
  Container,
  SectionTitle,
  TitleH2,
  Wrapper,
  WrapperButton,
  Form,
  RequiredText,
} from "../stylesComponents/ComponentAccount";
import BackButton from "../buttonComponents/BackButton";
import { useHandleGoBack } from "@/hooks/useHandleGoBack";

const fieldLabels = {
  newpassword: "Contraseña nueva",
  confirmpassword: "Repetir contraseña",
};
const initialData = {
  newpassword: "",
  confirmpassword: "",
};

const Authentication = () => {
  const router = useRouter();
  const handleGoBack = useHandleGoBack();
  const { data: session, status, update } = useSession();
  const [errorNotification, setErrorNotification] = useState("");
  const customer = session?.user;

  const [authData, setAuthData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorNotification("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar contraseñas antes de enviar la solicitud
    if (!authData?.newpassword || !authData?.confirmpassword) {
      setErrorNotification("Por favor, completa ambos campos de contraseña.");
      return;
    }
    if (authData.newpassword !== authData.confirmpassword) {
      setErrorNotification("Las contraseñas no coinciden.");
      return;
    }
    if (
      authData.newpassword.length < 6 ||
      authData.confirmpassword.length < 6
    ) {
      setErrorNotification("Las contraseñas debe tener al menos 6 caracteres");
      return;
    }

    const confirmation = await Swal.fire({
      title:
        "Al cambiar la contraseña se cerrará la sessión. ¿Quieres guardar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    });

    if (confirmation.isConfirmed) {
      try {
        const res = await axios.post("/api/auth/reset-password", {
          email: customer?.email,
          password: authData?.newpassword,
          confirmpassword: authData?.confirmpassword,
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
            title: res.data.message || "Cambios realizado con exito",
          });
          await signOut({ redirect: false });

          router.push("/auth/inicio-sesion");
          return;
        }
      } catch (error) {
        console.error("Error en el restablecimiento de contraseña:", error);
        setErrorNotification(
          error?.response?.data?.message ||
            "Algo salió mal!. Por favor, inténtalo más tarde."
        );
      }
    } else if (confirmation.isDenied) {
      // Mostrar mensaje de cambios no guardados
      Swal.fire("Los cambios no fueron guardados", "", "info");
      setAuthData(initialData)
    }
  };

  const handleCustomerCancel = () => {
    setAuthData(initialData);
  };

  const hasCustomerChanges = () => {
    return JSON.stringify(authData) !== JSON.stringify(initialData);
  };

  return (
    <Container>
      <header>
        <BackButton onClick={handleGoBack} />
        <TitleH2>Autenticación</TitleH2>
      </header>
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <SectionTitle>Cambiar contraseña</SectionTitle>
          <InputGroup
            required
            label={fieldLabels.newpassword}
            name="newpassword"
            value={authData?.newpassword}
            onChange={handleChange}
            placeholder="Ingresa una nueva contraseña"
          />

          <InputGroup
            required
            label={fieldLabels.confirmpassword}
            name="confirmpassword"
            value={authData?.confirmpassword}
            onChange={handleChange}
            placeholder="Repatir la una nueva contraseña"
          />
          <RequiredText>
            {errorNotification ? errorNotification : " "}
          </RequiredText>
          <WrapperButton>
            <Button
              type="button"
              title="Cancelar Cambios"
              onClick={handleCustomerCancel}
              disabled={!hasCustomerChanges()}
              $red
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              title="Gurdar Cambios"
              onClick={handleSubmit}
              disabled={!hasCustomerChanges()}
              $blue
            >
              Guardar
            </Button>
          </WrapperButton>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Authentication;
