import { black, primary } from "@/lib/colors";
import { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderContainert = styled.div`
  background-color: ${black};
  height: 100vh;
`;

const LoaderCircle = styled.div`
  display: inline-block; /* Muestra el círculo como un bloque en línea */
  border: 3px solid #f3f3f3; /* Light grey */
  border-top: 3px solid ${primary}; /* Blue */
  border-radius: 50%;
  position: absolute;
  color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  animation: ${spinAnimation} 1s linear infinite;
`;

export const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);
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
  }, []);

  return (
    <LoaderContainert style={{ display: isLoading ? "block" : "none" }}>
      <LoaderCircle />
    </LoaderContainert>
  );
};
