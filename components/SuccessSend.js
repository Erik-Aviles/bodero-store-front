import { white, success } from "@/lib/colors";
import React from "react";
import styled from "styled-components";
import Center from "./Center";
import { SuccessIcons } from "./Icons";
import Link from "next/link";

const ColumnsWrapper = styled.div`
  height: calc(100vh - 400px);
  gap: 40px;
  margin: 40px 0 80px;
`;

const Box = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: ${white};
  border-radius: 10px;
  padding: 70px 20px;
  p {
    font-size: 1.5em;
    margin: 0;
    place-self: center;
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
  a {
    cursor: pointer;
  }
`;

const SuccessSend = () => {
  return (
    <Center>
      <ColumnsWrapper>
        <Box>
          <SpanWrapper>
            <Link href={"/"} title={"Ir a Inicio"}>
              <SuccessIcons fill={success} width="5em" height="5em" />
            </Link>
          </SpanWrapper>
          <p>Tu pedido se ha realizado con exito!</p>
          <p>En tu correo te enviaremos la informacion sobre tu pedido</p>
        </Box>
      </ColumnsWrapper>
    </Center>
  );
};

export default SuccessSend;
