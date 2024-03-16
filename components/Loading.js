import { primary, white } from "@/lib/colors";
import styled from "styled-components";
import Head from "next/head";

const LoaderContainert = styled.div`
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const LoaderItem = styled.span`
  border: 2px solid ${primary};
  border-radius: 50%;
  border-left-color: ${white};
  animation: spin 0.8s ease infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Loading = ({ size }) => {
  return (
    <>
      <Head>
        <title>B.R.D | QUEVEDO</title>
        <meta name="description" content="Esperando cargar la pagina..." />
      </Head>
      <LoaderContainert>
        <LoaderItem style={{ width: size, height: size }} />
      </LoaderContainert>
    </>
  );
};
