import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { TitleH4 } from "@/components/stylesComponents/TitleH4";
import Center from "@/components/stylesComponents/Center";
import styled from "styled-components";
import { grey } from "@/lib/colors";

const Message = styled.p`
  font-size: 1rem;
  margin: 0;
  color: ${grey};
  margin-left: 20px;
`;

const PageError = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirigir a la página de inicio después de 3 segundos
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Layout title="Redirigiendo al inicio">
      <Center>
        <TitleH4>404 - Página no encontrada</TitleH4>
        <Message>
          ¡Serás redirigido a la página de inicio en unos segundos!
        </Message>
      </Center>
    </Layout>
  );
};

export default PageError;
