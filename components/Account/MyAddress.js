import React, { useContext, useEffect, useState } from "react";
import { countries } from "../../resource/curtomerData";
import InputGroup from "./forms/InputGroup";
import { loadStatesAndCities } from "@/utils/loadStatesAndCities";
import BackButton from "../buttonComponents/BackButton";
import {
  Container,
  TitleH2,
  Wrapper,

} from "../stylesComponents/ComponentAccount";
import { useHandleGoBack } from "@/hooks/useHandleGoBack";
import useAddress from "@/hooks/useAddress";
import FormAddress from "./forms/FormAddress";

const MyAddress = () => {
  const handleGoBack = useHandleGoBack();
  const { billingAddress, shippingAddress, mutateAddress, isLoading } =
    useAddress();

  return (
    <Container>
      <header>
        <BackButton onClick={handleGoBack} />
        <TitleH2>Mis Direcciones</TitleH2>
      </header>

      <Wrapper>
        {billingAddress && shippingAddress && (
          <FormAddress
            billingAddress={billingAddress}
            shippingAddress={shippingAddress}
            mutateAddress={mutateAddress}
            isLoading={isLoading}
          />
        )}
      </Wrapper>
    </Container>
  );
};

export default MyAddress;
