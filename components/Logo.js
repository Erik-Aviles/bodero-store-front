import Link from "next/link";
import React from "react";
import { styled } from "styled-components";

const LogoStyles = styled(Link)`
  color: red;
  text-decoration: none;
`;

const Logo = ({ href }) => {
  return <LogoStyles href={href}>Imagen Logo</LogoStyles>;
};

export default Logo;
