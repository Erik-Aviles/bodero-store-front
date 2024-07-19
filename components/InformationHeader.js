import {
  white,
  primary,
  black,
  success,
  warning,
  grey,
  blacklight,
} from "@/lib/colors";
import Link from "next/link";
import React from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import { linksUp } from "@/resource/linkRouterData";
import { LogoFull } from "./Logo";

const Wrapper = styled.div`
  background: #0e0f14;
  width: 100%;
  height: 41px;
  overflow: hidden;
  position: relative;
  @media screen and (max-width: 768px) {
    height: 88.55px;
  }
`;

const NavHeader = styled.nav`
  top: -30px;
  position: absolute;
  right: 0;
  margin: 12px auto 0;
  max-width: 800px;
  width: 100%;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ListInformation = styled.ul`
  display: table;
  width: 100%;
  position: relative;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ItemInformation = styled.li`
  display: table-cell;
  border-right: 0.3px solid #ccc;
`;

const StaledLink = styled(Link)`
  color: ${white};
  display: block;
  padding: 12px;
  position: relative;
  text-align: center;
  text-decoration: none;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
  &:hover {
    span {
      top: 0;
    }
  }
`;

const Spans = styled.span`
  display: block;
  width: 100%;
  height: 100%;
  left: 0;
  position: absolute;
  top: -35px;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
  ${(props) =>
    props.$isActive &&
    css`
      top: 0;
    `};
  ${(props) =>
    props.$one &&
    css`
      background: ${primary};
    `};
  ${(props) =>
    props.$two &&
    css`
      background: ${success};
    `};
  ${(props) =>
    props.$three &&
    css`
      background: #f2ae0d; /*amarillo*/
    `};
  ${(props) =>
    props.$four &&
    css`
      background: #013c92; /* azul */
    `};
  ${(props) =>
    props.$five &&
    css`
      background: ${warning};
    `};
`;

const Icons = styled.i`
  display: block;
  line-height: 45px;
`;
const TextPresentation = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.7rem;
  font-weight: bold;
  color: #ffff00;
  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 8px 8px 0 0;
  }
  p {
    margin: 0;
  }
  span {
    color: ${white};
  }
  a {
    color: ${warning};
    text-decoration: underline;
  }
  figure {
    margin: 0;
    width: 160px;
    height: 100%;
  }
  @media screen and (min-width: 480px) {
    font-size: 1rem;
  }
  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const InformationHeader = () => {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <Wrapper>
      <TextPresentation>
        <figure>
          <LogoFull href={"/"} />
        </figure>
        <div>
          <p>Si no encuentas lo que buscas... </p>
          <span>Nosotros lo conseguimos!</span>
          {/* <span>
            Todo lo que necesitas para tu vehículo, sin salir de casa.
          </span> */}
          <Link
            href={
              "https://api.whatsapp.com/send/?phone=593996501072&text=Hola, me interesa un producto. Necesito más información&type=phone_number&app_absent=1"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            Escríbenos!
          </Link>
        </div>
      </TextPresentation>
      <NavHeader>
        <ListInformation>
          {linksUp.map((link, index) => (
            <ItemInformation key={`id${index}1`} title={link.name}>
              <StaledLink href={link.href}>
                <Spans
                  $one={index === 0}
                  $two={index === 1}
                  $three={index === 2}
                  $four={index === 3}
                  $five={index === 4}
                  $isActive={pathname === link.href}
                >
                  <Icons>{link.icon}</Icons>
                </Spans>
                {link.name}
              </StaledLink>
            </ItemInformation>
          ))}
        </ListInformation>
      </NavHeader>
    </Wrapper>
  );
};

export default InformationHeader;
