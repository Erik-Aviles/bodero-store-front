import React from "react";
import styled from "styled-components";

const StyledDiv = styled.section`
  heigth: auto;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
  @media screen and (max-width: 320px) {
    padding: 0 10px;
  }
`;

const Center = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default Center;
