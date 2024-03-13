import styled from "styled-components";
import InformationFooter from "./InformationFooter";
import { grey, white } from "@/lib/colors";
import { LogoLetters } from "./Logo";
import Link from "next/link";
import { InstagramIcon, FacebookIcon, TiktokIcon } from "./Icons";

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
    aspect-ratio: 300/100;
  }
  @media screen and (max-width: 320px) {
    flex-direction: column;
    gap: 2px;
    font-size: 12px;
  }
`;
const ListSocialMedia = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export default function Footer() {
  return (
    <>
      <InformationFooter />
      <WrapperFooter>
        <LogoLetters href={"/"} />
        <ListSocialMedia>
          <span style={{ color: "black", fontStyle: "italic" }}>
            Síganos en:
          </span>
          <Link
            href={
              "https://www.instagram.com/cesar_bodero?igsh=emZ4Y20yb2RnMjd6"
            }
            target="_blank"
            rel="noopener noreferrer"
            title={"Instagram"}
          >
            <img
              src="/svg/instagram.svg"
              alt="Repo Instagram"
              width={17}
              height={17}
            />
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
          <img width={100} src="/images/betimes/betimesCompany.png" />
        </WrapperFooterSpan>
      </WrapperFooter>
    </>
  );
}
