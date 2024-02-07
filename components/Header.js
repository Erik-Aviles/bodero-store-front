import { LogoFull, LogoLetters } from "./Logo";
import styled, { css } from "styled-components";
import { black, grey, primary, white } from "@/lib/colors";
import Link from "next/link";
import { HamburguerIcon, ProductIcon, WhatsappIcon } from "./Icons";
import InformationHeader from "./InformationHeader";
import Center from "./Center";

const StyledHeader = styled.header`
  width: 100%;
  background-color: ${white};

  @media screen and (max-width: 640px) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    position: fixed;
    z-index: 1;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: ${white};
`;

const StyleNav = styled.nav`
  display: flex;
  gap: 20px;
`;

const StaledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  color: ${grey};

  &:hover {
    color: #ccc;
  }
  ${(props) =>
    props.hidden &&
    css`
      display: none;
    `};
`;

const StylesSpan = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    ${(props) =>
      props.$anim &&
      css`
        animation: bounce 1s infinite;

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(-25%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
      `};
  }
  h3 {
    font-size: 1.5rem;
    margin: 0;
  }
  p {
    margin: 0;
  }
  @media screen and (max-width: 768px) {
    h3,
    p {
      display: none;
    }
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 50px;
  height: 50px;
  color: ${primary};
  border: 0;
  cursor: pointer;
`;

export default function Header() {
  return (
    <StyledHeader>
      <InformationHeader />
      <Center>
        <Wrapper>
          <LogoFull href={"/"} />
          <StyleNav>
            <StaledLink href={"/products"} title={"Ver todos los productos"}>
              <StylesSpan>
                <ProductIcon />
                <p>Productos</p>
              </StylesSpan>
            </StaledLink>

            <StaledLink
              href={
                "https://api.whatsapp.com/send/?phone=593996501072&text&type=phone_number&app_absent=1"
              }
              target="_blank"
              rel="noopener noreferrer"
              title={"Enviar mensaje por Whatsapp"}
            >
              <StylesSpan $anim={1}>
                <WhatsappIcon title={"Enviar mensaje por Whatsapp"} />
                <p>Escribenos</p>
                <h3>0996501072</h3>
              </StylesSpan>
            </StaledLink>
          </StyleNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
