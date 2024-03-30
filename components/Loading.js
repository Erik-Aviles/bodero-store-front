import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { black, primary } from "@/lib/colors";
import Head from "next/head";
import { RiseLoader } from "react-spinners";

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
        <title>B.R.D | Cargando...</title>
      </Head>
      <LoaderContainert>
        <RiseLoader color={primary} speedMultiplier={1} size={7} />
      </LoaderContainert>
    </>
  );
};
