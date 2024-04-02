import { LogoFull } from "./Logo";
import styled, { css } from "styled-components";
import { grey, white } from "@/lib/colors";
import Link from "next/link";
import { ProductIcon, ShoppingIcon, UserIcon, WhatsappIcon } from "./Icons";
import InformationHeader from "./InformationHeader";
import Center from "./stylesComponents/Center";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";

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
  gap: 20px;
  color: ${white};
  padding: 0 10px 0 0;
  @media screen and (min-width: 412px) {
    justify-content: space-between;
  }
`;

const StyleNav = styled.nav`
  display: flex;
  place-items: center;
  gap: 8px;
  @media screen and (min-width: 768px) {
    gap: 20px;
  }
`;

const StaledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  color: ${grey};
`;

const StylesSpan = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: #ccc;
  }
  h3 {
    font-size: 1.3rem;
    margin: 0;
  }
  p {
    font-size: 0.7rem;
    margin: 0;
  }
  svg {
    cursor: pointer;
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
  @media screen and (max-width: 768px) {
    h3 {
      display: none;
    }
    p {
      font-size: 0.5rem;
    }
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  return (
    <StyledHeader>
      <InformationHeader />
      <Center>
        <Wrapper>
          <LogoFull href={"/"} />
          <StyleNav>
            <StaledLink
              href={
                "https://api.whatsapp.com/send/?phone=593996501072&text=Hola, me interesa un producto. Necesito más información&type=phone_number&app_absent=1"
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
            </StaledLink>{" "}
            <StaledLink href={"/products"} title={"Ver todos los productos"}>
              <StylesSpan>
                <ProductIcon />
                <p>Productos</p>
              </StylesSpan>
            </StaledLink>
            {/*  <StaledLink
              hidden={1}
              href={"/account/user-info"}
              title={"Ver mi cuenta"}
            >
              <StylesSpan>
                <UserIcon />
                <p>Mi perfil</p>
              </StylesSpan>
            </StaledLink> */}
            <StaledLink href={"/iniciar-sesion"} title={"Entrar a mi cuenta"}>
              <StylesSpan>
                <UserIcon />
                <p>Iniciar sesión</p>
              </StylesSpan>
            </StaledLink>
            <StaledLink
              href={"/carrito-de-compras"}
              title={"Ver mi carrito de compras"}
            >
              <StylesSpan>
                <ShoppingIcon />
                <p>Carrito ({cartProducts?.length})</p>
              </StylesSpan>
            </StaledLink>
          </StyleNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
