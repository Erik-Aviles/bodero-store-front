import InformationFooter from "./InformationFooter";
import { black, grey, success, white } from "@/lib/colors";
import styled from "styled-components";
import { LogoLetters } from "./Logo";
import Link from "next/link";

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
  text-align: center;
  font: small-caption;
  @media screen and (max-width: 320px) {
    font-size: 14px;
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
              width={21}
              height={21}
            />
          </Link>
          <Link
            href={"https://www.facebook.com/boderoracing?mibextid=LQQJ4d"}
            target="_blank"
            rel="noopener noreferrer"
            title={"FaceBook"}
          >
            <img
              src={"/svg/facebook.svg"}
              alt="Repo FaceBook"
              width={21}
              height={21}
            />
          </Link>
          <Link
            href={
              "https://www.tiktok.com/@boderoracingdevel?_t=8k9dJNXQObF&_r=1"
            }
            target="_blank"
            rel="noopener noreferrer"
            title={"TikTok"}
          >
            <img
              src={"/svg/tiktok.svg"}
              alt="Repo TikTok"
              width={21}
              height={21}
            />
          </Link>
        </ListSocialMedia>
        <WrapperFooterSpan>
          © 2024 - Bodero Racing Development <br />
          TODOS LOS DERECHOS RESERVADOS
        </WrapperFooterSpan>
      </WrapperFooter>
    </>
  );
}
