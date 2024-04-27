import React from "react";
import styled from "styled-components";

const StyledUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem 4rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem 3rem;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem 2rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem 2rem;
  }
`;

const StyledLi = styled.li`
  position: relative;
`;

const StyledImg = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  transition: opacity 0.3s ease-in-out;

  .${StyledLi}:hover & {
    opacity: 0.75;
  }
`;

const StyledTitle = styled.p`
  margin-top: 0.5rem;
  font-weight: 500;
`;

const StyledText = styled.p`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

export default function Movies({ products }) {
  return (
    <StyledUl>
      {products?.map((product) => (
        <StyledLi key={product._id.toString()}>
          <div></div>
          <StyledTitle>{product.title}</StyledTitle>
        </StyledLi>
      ))}
    </StyledUl>
  );
}
