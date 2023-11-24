import { white, success, grey } from "@/lib/colors";
import React from "react";
import styled from "styled-components";
import Center from "./Center";
import { SuccessIcon } from "./Icons";
import ButtonLink from "./ButtonLink";
import Link from "next/link";

const Box = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${white};
  border-radius: 10px;
  padding: 70px 20px;
  color: ${grey};
  margin: 80px;
  h4 {
    font-size: 1.5rem;
  }
  p {
    font-size: 0.8rem;
  }
  p,
  h4 {
    padding-bottom: 10px;
    margin: 0;
    place-self: center;
  }
  a {
    text-decoration: none;
    strong {
      color: ${grey};
    }
  }
`;

const SpanWrapper = styled.div`
  place-self: center;
  width: 80px;
  height: 80px;
  border: 5px solid ${success};
  border-radius: 100%;
  text-align: center;
  padding: ;
`;

const SuccessSend = () => {
  return (
    <Center>
      <Box>
        <SpanWrapper>
          <SuccessIcon fill={success} width="3em" height="3em" />
        </SpanWrapper>
        <h4>Lo tenemos!</h4>
        <p>
          Un e-mail de confirmación ha sido enviada a la dirección de correo
          electrónico asociado a tu cuenta.
        </p>
        <p>
          Puedes confirmar tu dirección de e-mail en la opción{" "}
          <Link href={"/account/user-info"} title={"Ir a mi cuenta"}>
            <strong>Mi Cuenta</strong>
          </Link>
        </p>
        <ButtonLink black={1} href={"/"} title={"Ir a Inicio"}>
          Ir a Inicio
        </ButtonLink>
      </Box>
    </Center>
  );
};

export default SuccessSend;
