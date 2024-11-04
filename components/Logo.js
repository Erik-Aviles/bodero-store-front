import cloudinaryLoader from "./loaderes/cloudinaryLoader";
import logoLetras from "../public/logoLetras.jpg";
import { useData } from "@/hooks/useData";
import styled from "styled-components";
import logo from "../public/logo.jpg";
import Image from "next/image";
import Link from "next/link";
import localLoader from "./loaderes/localLoader";

const Figure = styled.figure`
  width: 150px;
  margin: 0;
  img {
    width: 100%;
    height: auto;
  }
  @media screen and (min-width: 640px) {
    width: 200px;
  }
`;

export const LogoFull = ({ href }) => {
  const { company } = useData();
  const { mainlogo } = company || {};

  return (
    <Link href={href}>
      <Figure>
        <Image
          loader={mainlogo ? cloudinaryLoader : localLoader}
          alt="Logo B.D.R"
          src={mainlogo ? mainlogo : logo}
          width={200}
          height={40}
        />
      </Figure>
    </Link>
  );
};

export const LogoLetters = ({ href }) => {
  const { company } = useData();
  const { secondarylogo } = company || {};
  return (
    <Link href={href}>
      <Figure>
        <Image
          loader={secondarylogo ? cloudinaryLoader : localLoader}
          alt="Logo B.D.R"
          src={secondarylogo ? secondarylogo : logoLetras}
          width={300}
          height={140}
        />
      </Figure>
    </Link>
  );
};
