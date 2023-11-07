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
  svg: {
    height: 16px;
  }
  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: #000;
    `};
  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `};
  ${(props) =>
    props.primary &&
    css`
      background-color: #fe0000;
      color: #fff;
      border: 1px solid #fe0000;
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
