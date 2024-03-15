import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import styled, { css } from "styled-components";
import * as React from "react";
import { black, primary, white } from "@/lib/colors";

const ContainerArrow = styled.div`
  position: absolute;
  top: -55px;
  ${(props) =>
    props.$anex &&
    css`
      right: 0px;
    `};
  ${(props) =>
    props.$apre &&
    css`
      right: 80px;
    `};
  @media screen and (max-width: 640px) {
    top: 435px;
    ${(props) =>
      props.$anex &&
      css`
        right: 60px;
      `};
    ${(props) =>
      props.$apre &&
      css`
        left: 8px;
      `};
  }
`;
const ArrowBox = styled.div`
  background-color: ${black};
  color: ${white};
  font-size: large;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  &:hover {
    color: ${primary};
  }
  @media screen and (max-width: 640px) {
    position: absolute;
    z-index: 10;
  }
`;

export const NextArrow = ({ onClick }) => {
  return (
    <ContainerArrow $anex={1} onClick={onClick}>
      <ArrowBox>
        <BsChevronRight />
      </ArrowBox>
    </ContainerArrow>
  );
};

export const PrevArrow = ({ onClick }) => {
  return (
    <ContainerArrow $apre={1} onClick={onClick}>
      <ArrowBox>
        <BsChevronLeft />
      </ArrowBox>
    </ContainerArrow>
  );
};
