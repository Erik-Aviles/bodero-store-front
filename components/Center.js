import React from "react";
import { styled } from "styled-components";

const StyledDiv = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Center = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default Center;
