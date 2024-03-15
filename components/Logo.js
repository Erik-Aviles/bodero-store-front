import styled from "styled-components";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.jpg";
import logoLetras from "../public/logoLetras.jpg";

const StaledLink = styled(Link)`
  width: 250px;

  @media screen and (max-width: 640px) {
    width: 200px;
  }
`;

export const LogoFull = ({ href }) => {
  return (
    <StaledLink href={href}>
      <Image
        alt="Logo B.D.R"
        layout="responsive"
        src={logo}
        width={300}
        height={140}
      />
    </StaledLink>
  );
};

export const LogoLetters = ({ href }) => {
  return (
    <StaledLink href={href}>
      <Image alt="Logo B.D.R" src={logoLetras} layout="responsive" />
    </StaledLink>
  );
};
