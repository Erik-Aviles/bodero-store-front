import styled from "styled-components";
import InformationFooter from "./InformationFooter";
import { black, grey, white } from "@/lib/colors";
import logoLetras from "../public/logoLetras.jpg";
import Link from "next/link";
import Image from "next/image";
import betimes from "../public/images/betimes/betimesCompany.png";
import instagram from "../public/svg/instagram.svg";
import facebook from "../public/svg/facebook.svg";
import tiktok from "../public/svg/tiktok.svg";

const WrapperFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  background-color: ${white};
  padding: 40px 20px;
  color: ${grey};
  p {
    margin: 0;
  }
  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;
const WrapperFooterSpan = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font: small-caption;
  font-size: 10px;
  img {
    width: 35%;
    height: auto;
  }
  @media screen and (min-width: 768px) {
    order: 1;
  }
`;
const Logo = styled(Link)`
  width: 280px;
  img {
    width: 100%;
    height: auto;
  }
  @media screen and (min-width: 768px) {
    order: 2;
    width: 300px;
  }
`;

const ListSocialMedia = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  span {
    color: ${black};
    font-style: "italic";
  }
  @media screen and (min-width: 768px) {
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    order: 3;
    a {
      align-self: end;
    }
  }
`;

export default function Footer() {
  return (
    <>
      <InformationFooter />
      <WrapperFooter>
        <ListSocialMedia>
          <span>Síganos en:</span>
          <Link
            href={
              "https://www.instagram.com/cesar_bodero?igsh=emZ4Y20yb2RnMjd6"
            }
            target="_blank"
            rel="noopener noreferrer"
            title={"Instagram B.R.D"}
          >
            <Image
              src={instagram}
              alt="Instagram B.R.D"
              width={25}
              height={25}
            />
          </Link>
          <Link
            href={"https://www.facebook.com/boderoracing?mibextid=LQQJ4d"}
            target="_blank"
            rel="noopener noreferrer"
            title={"FaceBook B.R.D"}
          >
            <Image src={facebook} alt="FaceBook B.R.D" width={25} height={25} />
          </Link>
          <Link
            href={
              "https://www.tiktok.com/@boderoracingdevel?_t=8k9dJNXQObF&_r=1"
            }
            target="_blank"
            rel="noopener noreferrer"
            title={"TikTok B.R.D"}
          >
            <Image src={tiktok} alt="TikTok B.R.D" width={25} height={25} />
          </Link>
        </ListSocialMedia>
        <Logo href={"/"}>
          <Image alt="Logo B.D.R" src={logoLetras} title={"Ir al Inicio"} />
        </Logo>
        <WrapperFooterSpan>
          <Image src={betimes} alt="Logo de Betimes Company" />
          Diseño y Desarrollo Web - © 2024
        </WrapperFooterSpan>
      </WrapperFooter>
    </>
  );
}
