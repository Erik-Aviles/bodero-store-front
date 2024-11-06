import styled from "styled-components";
import InformationFooter from "./InformationFooter";
import { black, grey, primary, white } from "@/lib/colors";
import logoLetras from "../public/logoLetras.jpg";
import Link from "next/link";
import Image from "next/image";
import betimes from "../public/images/betimes/betimesCompany.png";
import instagram from "../public/svg/instagram.svg";
import facebook from "../public/svg/facebook.svg";
import tiktok from "../public/svg/tiktok.svg";
import { useData } from "@/hooks/useData";

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
  gap: 10px;
  font-weight: bold;
  color: ${black};

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

const SocialMediaName = styled.i`
  font-size: 14px;
  font-weight: normal;
  color: #6b7280;
  transition: color 300ms;
  text-transform: capitalize;

  &:hover {
    color: ${primary};
  }
`;

export default function Footer() {
  const { company } = useData();
  const socialMedia = company?.socialMedia;

  return (
    <>
      <InformationFooter />
      <WrapperFooter>
        <ListSocialMedia>
          <span>Síganos en:</span>
          {socialMedia?.map(({ title, link, icon }) => (
            <Link
              key={title}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              title={title}
            >
              {icon ? (
                <Image src={icon} alt={title} width={25} height={25} />
              ) : (
                <SocialMediaName>{title}</SocialMediaName>
              )}
            </Link>
          ))}
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
