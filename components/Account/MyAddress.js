import React from "react";
import BackButton from "../buttonComponents/BackButton";
import {
  Container,
  TitleH2,
  Wrapper,
} from "../stylesComponents/ComponentAccount";
import { useHandleGoBack } from "@/hooks/useHandleGoBack";
import FormAddress from "./forms/FormAddress";

const MyAddress = () => {
  const handleGoBack = useHandleGoBack();

  return (
    <Container>
      <header>
        <BackButton onClick={handleGoBack} />
        <TitleH2>Mis Direcciones</TitleH2>
      </header>

      <Wrapper>
        <FormAddress />
      </Wrapper>
    </Container>
  );
};

export default MyAddress;
