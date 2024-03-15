import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { BackIcon } from "../Icons";
import styled from "styled-components";
import { greylight, white } from "@/lib/colors";

const WrapperBackButtom = styled.div`
  margin: 8px 0;
  display: block;
`;

const StyledBackButton = styled.button`
  background-color: ${white};
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #f2f0f0;
  }
  &:focus {
    background-color: #f2f0f0;
  }
`;

const BackButton = ({ onClick }) => {
  return (
    <WrapperBackButtom>
      <StyledBackButton onClick={onClick}>
        <BackIcon />
      </StyledBackButton>
    </WrapperBackButtom>
  );
};

export default BackButton;
