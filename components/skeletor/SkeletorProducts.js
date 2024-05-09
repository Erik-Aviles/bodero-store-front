import { primary, white } from "@/lib/colors";
import React, { useEffect, useState } from "react";
import { RiseLoader } from "react-spinners";
import styled from "styled-components";

const SkeletorProductsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  div {
    height: 327px;
    width: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
    background-color: ${white};
    padding: 0.8rem;
    margin: 8px auto;
    @media screen and (min-width: 360px) {
      width: 11rem;
    }
  }
`;

const SkeletorProducts = () => {
  const [slideToShow, serSlideToShow] = useState(7);

  const setSlides = () => {
    if (window.innerWidth <= 1280 && window.innerWidth > 1024) {
      serSlideToShow(7);
    } else if (window.innerWidth <= 1024 && window.innerWidth > 820) {
      serSlideToShow(5);
    } else if (window.innerWidth <= 820 && window.innerWidth > 412) {
      serSlideToShow(3);
    } else if (window.innerWidth <= 412 && window.innerWidth >= 320) {
      serSlideToShow(2);
    } else if (window.innerWidth < 320) {
      serSlideToShow(1);
    }
  };

  useEffect(() => {
    setSlides();
  }, []);

  return (
    <SkeletorProductsGrid>
      {/* Usamos un bucle for para generar los elementos */}
      {Array.from({ length: slideToShow }, (_, index) => (
        <div key={index}>
          <RiseLoader color={primary} speedMultiplier={1} size={7} />
        </div>
      ))}
    </SkeletorProductsGrid>
  );
};

export default SkeletorProducts;
