import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import styled, { css } from "styled-components";
import * as React from "react";
import { secondary, success, white } from "@/lib/colors";

const ContainerArrow = styled.div`
  position: absolute;
  top: 10px;
  ${(props) =>
    props.$catNex &&
    css`
      right: -22px;
    `};
  ${(props) =>
    props.$catPre &&
    css`
      left: -22px;
    `};
`;
const ArrowBox = styled.div`
  color: ${white};
  font-size: 26px;
  display: grid;
  place-items: center;
  cursor: pointer;
  &:hover {
    color: ${success};
  }
`;

export const NextArrowCategory = ({ onClick }) => {
  return (
    <ContainerArrow $catNex={1} onClick={onClick}>
      <ArrowBox>
        <BsChevronRight />
      </ArrowBox>
    </ContainerArrow>
  );
};

export const PrevArrowCategory = ({ onClick }) => {
  return (
    <ContainerArrow $catPre={1} onClick={onClick}>
      <ArrowBox>
        <BsChevronLeft />
      </ArrowBox>
    </ContainerArrow>
  );
};
