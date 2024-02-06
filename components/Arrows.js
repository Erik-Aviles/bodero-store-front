import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import styled, { css } from "styled-components";
import * as React from "react";
import { black, primary, white } from "@/lib/colors";

const ContainerArrow = styled.div`
  position: absolute;
  top: -55px;
  ${(props) =>
    props.next &&
    css`
      right: 0px;
    `};
  ${(props) =>
    props.prev &&
    css`
      right: 80px;
    `};
  @media screen and (max-width: 640px) {
    top: 405px;
    ${(props) =>
      props.next &&
      css`
        right: 8px;
      `};
    ${(props) =>
      props.prev &&
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
`;

export const NextArrow = ({ onClick }) => {
  return (
    <ContainerArrow next={1} onClick={onClick}>
      <ArrowBox>
        <BsChevronRight />
      </ArrowBox>
    </ContainerArrow>
  );
};

export const PrevArrow = ({ onClick }) => {
  return (
    <ContainerArrow prev={1} onClick={onClick}>
      <ArrowBox>
        <BsChevronLeft />
      </ArrowBox>
    </ContainerArrow>
  );
};
