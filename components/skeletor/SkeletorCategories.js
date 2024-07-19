import { primary, white } from "@/lib/colors";
import React, { useEffect, useState } from "react";
import { RiseLoader } from "react-spinners";
import styled from "styled-components";

const SkeletorCategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: hidden;
  gap: 15px;
  padding-bottom: 40px;
  div {
    min-width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 5px;
    box-shadow: 0px 3px 3px rgba(255, 0, 0, 0.5);
    width: 200px;
    border: 1px solid rgba(255, 0, 0, 0.5);
    background-color: ${white};
    padding: 20px;
  }
`;
const SkeletorCategories = () => {
  const [slideToShow, serSlideToShow] = useState(5);

  const setSlides = () => {
    if (window.innerWidth <= 1280 && window.innerWidth > 1024) {
      serSlideToShow(5);
    } else if (window.innerWidth <= 820 && window.innerWidth > 412) {
      serSlideToShow(3);
    } else if (window.innerWidth <= 412 && window.innerWidth >= 320) {
      serSlideToShow(1);
    }
  };

  useEffect(() => {
    setSlides();
  }, []);

  return (
    <SkeletorCategoriesContainer>
      {/* Usamos un bucle for para generar los elementos */}
      {Array.from({ length: slideToShow }, (_, index) => (
        <div key={index}>
          <RiseLoader color={primary} speedMultiplier={1} size={7} />
        </div>
      ))}
    </SkeletorCategoriesContainer>
  );
};

export default SkeletorCategories;
