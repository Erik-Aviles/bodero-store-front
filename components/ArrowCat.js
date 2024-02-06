import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import styled, { css } from "styled-components";
import * as React from "react";
import { secondary, success, white } from "@/lib/colors";

const ContainerArrow = styled.div`
  position: absolute;
  top: 10px;
  ${(props) =>
    props.nextcat &&
    css`
      right: -22px;
    `};
  ${(props) =>
    props.prevcat &&
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
    <ContainerArrow nextcat={1} onClick={onClick}>
      <ArrowBox>
        <BsChevronRight />
      </ArrowBox>
    </ContainerArrow>
  );
};

export const PrevArrowCategory = ({ onClick }) => {
  return (
    <ContainerArrow prevcat={1} onClick={onClick}>
      <ArrowBox>
        <BsChevronLeft />
      </ArrowBox>
    </ContainerArrow>
  );
};
