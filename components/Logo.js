import styled from "styled-components";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";

const StaledLink = styled(Link)`
  display: flex;
  align-items: center;
  width: 300px;
  img {
    width: auto;
    height: auto;
    object-fit: contain;
    @media screen and (max-width: 768px) {
      width: 200px;
    }
  }
`;

export const LogoFull = ({ href }) => {
  return (
    <StaledLink href={href}>
      <Image alt="Logo B.D.R" src="/logo.jpg" width={300} height={120} />
    </StaledLink>
  );
};

export const LogoLetters = ({ href }) => {
  return (
    <StaledLink href={href}>
      <Image alt="Logo B.D.R" src="/logoLetras.jpg" width={300} height={60} />
    </StaledLink>
  );
};
