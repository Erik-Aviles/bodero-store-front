import cloudinaryLoader from "@/components/loaderes/cloudinaryLoader";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { white } from "@/lib/colors";
import Image from "next/image";
import Head from "next/head";

const Wrapper = styled.section`
  position: relative;
  @media screen and (min-width: 640px) {
    height: 100vh;
  }
`;

const ContentSection = styled.section`
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 40px;
  @media screen and (min-width: 640px) {
    padding: 20px;
  }
`;

const Title = styled.h3`
  font-size: 2rem;
  margin: 0;
  color: ${white};
  margin-left: 20px;
`;
const Message = styled.p`
  font-size: 1.8rem;
  margin: 0;
  color: ${white};
  margin-left: 20px;
`;

export default function PageError() {
  const router = useRouter();

  useEffect(() => {
    // Redirigir a la página de inicio después de 3 segundos
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Head>
        <title>Redirigiendo al inicio</title>
        <meta name="description" content="Pagina no se encuentra" />
      </Head>
      <Wrapper>
        <Image
          loader={cloudinaryLoader}
          alt="Imagen de fondo De un paisaje"
          src="https://res.cloudinary.com/imagen-category/image/upload/v1716601198/samples/bike.jpg"
          layout="fill"
        />
        <ContentSection>
          <Title>404 - Página no encontrada</Title>
          <Message>
            ¡Serás redirigido a la página de inicio en unos segundos!
          </Message>
        </ContentSection>
      </Wrapper>
    </>
  );
}
