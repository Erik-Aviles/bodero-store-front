import { black, primary, white, secondary } from "@/lib/colors";
import React from "react";
import { css, styled } from "styled-components";

export const ButtonStyle = css`
  border: 0;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  svg: {
    height: 16px;
  }
  ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `};
  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: ${white};
      color: ${black};
    `};
  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: ${white};
      border: 1px solid ${white};
    `};
  ${(props) =>
    props.primary &&
    !props.outline &&
    css`
      background-color: ${primary};
      color: ${white};
      border: 1px solid ${primary};
    `};
  ${(props) =>
    props.primary &&
    props.outline &&
    css`
      background-color: transparent;
      color: ${primary};
      border: 1px solid ${primary};
    `};
  ${(props) =>
    props.secondary &&
    !props.outline &&
    css`
      background-color: ${secondary};
      color: ${white};
      border: 1px solid ${secondary};
    `};
  ${(props) =>
    props.secondary &&
    props.outline &&
    css`
      background-color: transparent;
      color: ${secondary};
      border: 1px solid ${secondary};
    `};
  ${(props) =>
    props.black &&
    !props.outline &&
    css`
      background-color: ${black};
      color: ${white};
      border: 1px solid ${black};
    `};
  ${(props) =>
    props.black &&
    props.outline &&
    css`
      background-color: transparent;
      color: ${black};
      border: 1px solid ${black};
    `};
  ${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 15px;
    `};
`;

const StyleButton = styled.button`
  ${ButtonStyle}
`;

const Button = ({ children, ...rest }) => {
  return <StyleButton {...rest}>{children}</StyleButton>;
};

export default Button;
