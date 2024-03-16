import styled from "styled-components";
import { primary } from "@/lib/colors";
import { ClockLoader } from "react-spinners";
import Head from "next/head";

const LoaderContainert = styled.div`
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export const Loading = () => {
  return (
    <>
      <Head>
        <title>B.R.D | QUEVEDO</title>
        <meta name="description" content="Esperando cargar la pagina..." />
      </Head>
      <LoaderContainert>
        <ClockLoader color={primary} size={80} />;
      </LoaderContainert>
    </>
  );
};
