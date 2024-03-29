import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { black, primary } from "@/lib/colors";
import Head from "next/head";
import { RiseLoader } from "react-spinners";

const LoaderContainert = styled.div`
  background-color: ${black};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Loading = () => {
  /* const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const images = Array.from(document.images);
    let loadedImagesCount = 0;

    const handleImageLoaded = () => {
      loadedImagesCount++;
      if (loadedImagesCount === images.length) {
        // Cuando todas las imágenes estén cargadas, desactiva el Loader
        setIsLoading(false);
      }
    };

    images.forEach((image) => {
      if (image.complete) {
        handleImageLoaded();
      } else {
        image.addEventListener("onload", handleImageLoaded);
      }
    });

    return () => {
      // Limpiar event listeners al desmontar el componente
      images.forEach((image) => {
        image.removeEventListener("onload", handleImageLoaded);
      });
    };
  }, []); */

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
