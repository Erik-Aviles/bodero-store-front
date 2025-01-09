import React, { useState } from "react";
import InputGroup from "./forms/InputGroup";
import {
  Button,
  Container,
  SectionTitle,
  TitleH2,
  Wrapper,
  WrapperButton,
  Form,
} from "../stylesComponents/ComponentAccount";
import BackButton from "../buttonComponents/BackButton";
import { useHandleGoBack } from "@/hooks/useHandleGoBack";
import { useSession } from "next-auth/react";

const Authentication = () => {
  const handleGoBack = useHandleGoBack()
  const { data: session, status, update } = useSession();
  const customer = session?.user;
  
  const fieldLabels = {
    newpassword: "Contraseña nueva",
    confirmpassword: "Repetir contraseña",
  };
  const initialData = {
    newpassword: "",
    confirmpassword: "",
  };
  const [authData, setAuthData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCustomerSave = () => {
    alert("Datos del cliente guardados correctamente.");
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
        <Form>
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
          <WrapperButton>
            <Button
              type="button"
              title="Cancelar Cambios"
              onClick={handleCustomerCancel}
              disabled={!hasCustomerChanges()}
              $canceled
            >
              Cancelar
            </Button>
            <Button
              type="button"
              title="Gurdar Cambios"
              onClick={handleCustomerSave}
              disabled={!hasCustomerChanges()}
              $save
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
