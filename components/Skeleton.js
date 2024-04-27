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

const StyledDiv = styled.div`
  width: 100%;
  height: 0;
  padding-top: 100%; /* aspect ratio 1:1 */
  background-color: #d1d5db; /* bg-gray-300 */
  border-radius: 0.5rem; /* rounded-lg */
`;

const StyledP = styled.p`
  margin-top: 0.5rem;
  height: 1rem; /* h-4 */
  width: 50%; /* w-1/2 */
  border-radius: 0.5rem; /* rounded-lg */
  background-color: #4b5563; /* bg-gray-600 */
`;

export default function Skeleton() {
  return (
    <StyledUl>
      {[...Array(10)].map((_, index) => (
        <StyledLi key={index}>
          <StyledDiv />
          <StyledP />
          <StyledP />
          <StyledP />
        </StyledLi>
      ))}
    </StyledUl>
  );
}
