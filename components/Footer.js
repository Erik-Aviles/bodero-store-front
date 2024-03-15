import styled from "styled-components";
import InformationFooter from "./InformationFooter";
import { black, grey, white } from "@/lib/colors";
import { LogoLetters } from "./Logo";
import Link from "next/link";
import { InstagramIcon, FacebookIcon, TiktokIcon } from "./Icons";
import Image from "next/image";
import betimes from "../public/images/betimes/betimesCompany.png";

const WrapperFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  background-color: ${white};
  padding: 40px 20px;
  color: ${grey};
  p {
    margin: 0;
  }
`;
const WrapperFooterSpan = styled.span`
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: center;
  font: small-caption;
  img {
    width: auto;
    height: auto;
  }
  font-size: 12px;
  @media screen and (max-width: 320px) {
    flex-direction: column;
    gap: 2px;
  }
`;
const ListSocialMedia = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  span {
    color: ${black};
    font-style: "italic";
  }
`;

export default function Footer() {
  return (
    <>
      <InformationFooter />
      <WrapperFooter>
        <LogoLetters href={"/"} />
        <ListSocialMedia>
          <span>Síganos en:</span>
          <Link
            href={
              "https://www.instagram.com/cesar_bodero?igsh=emZ4Y20yb2RnMjd6"
            }
            target="_blank"
            rel="noopener noreferrer"
            title={"Instagram"}
          >
            <InstagramIcon />
          </Link>
          <Link
            href={"https://www.facebook.com/boderoracing?mibextid=LQQJ4d"}
            target="_blank"
            rel="noopener noreferrer"
            title={"FaceBook"}
          >
            <FacebookIcon />
          </Link>
          <Link
            href={
              "https://www.tiktok.com/@boderoracingdevel?_t=8k9dJNXQObF&_r=1"
            }
            target="_blank"
            rel="noopener noreferrer"
            title={"TikTok"}
          >
            <TiktokIcon />
          </Link>
        </ListSocialMedia>
        <WrapperFooterSpan>
          © 2024 - Diseñado y Desarrollado por:
          <Image
            width={300 / 3}
            height={100 / 3}
            src={betimes}
            alt="Logo de Betimes Company"
          />
        </WrapperFooterSpan>
      </WrapperFooter>
    </>
  );
}
