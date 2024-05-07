import styled, { css } from "styled-components";
import { black, grey, greylight, primary, success, white } from "@/lib/colors";
import Link from "next/link";
import { ProductIcon, UserIcon, WhatsappIcon } from "./Icons";
import { CartContext } from "@/context/CartContext";
import { useContext, useState } from "react";
import ToogleNavBar from "./buttonComponents/ButtonHamburger";
import CartComponent from "./CartComponent";
import { useRouter } from "next/router";

const StyledHeader = styled.header`
  position: -webkit-sticky;
  position: sticky;
  z-index: 1;
  bottom: 0;
  border: none;
  border-radius: 15px 15px 0 0;
  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const StyleNav = styled.nav`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  align-items: center;
  border-radius: 15px 15px 0 0;
  background: ${black};
`;

const StaledLink = styled(Link)`
  width: 100%;
  height: 100%;
  padding: 12px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-right: 0.1px solid ${greylight};
  ${(props) =>
    props.$active &&
    css`
      background: ${primary};
    `};
  ${(props) =>
    props.$endBorder &&
    css`
      border-right: 0;
    `};
`;
const StaledDiv = styled.div`
  width: 100%;
  padding: 12px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-right: 0.1px solid ${greylight};
`;

const StylesWrapperWhatsApp = styled.div`
  height: 28px;
  svg {
    cursor: pointer;
    font-size: 0.7rem;
    animation: bounce 1s infinite;
    @keyframes bounce {
      0%,
      100% {
        transform: translateY(-20%);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
      }
      50% {
        transform: translateY(0);
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
      }
    }
  }
`;

const TextSpan = styled.p`
  margin: 0;
  color: ${white};
  font-size: 0.6rem;
`;

export default function NavMovil() {
  const router = useRouter();
  const path = router.pathname;
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <StyledHeader>
      <StyleNav>
        <StaledDiv $active={showModal ? 1 : 0} onClick={toggleModal}>
          <ToogleNavBar showModal={showModal} toggleModal={toggleModal} />
        </StaledDiv>
        <StaledLink
          $active={path === "/products" ? 1 : 0}
          href={"/products"}
          title={"Ver todos los productos"}
        >
          <ProductIcon />
          <TextSpan>Productos</TextSpan>
        </StaledLink>
        <StaledLink
          $active={path === "/carrito-de-compras" ? 1 : 0}
          href={"/carrito-de-compras"}
          title={"Ver mi carrito de compras"}
        >
          <CartComponent />
          <TextSpan>Carrito</TextSpan>
        </StaledLink>
        <StaledLink
          $active={path === "#" ? 1 : 0}
          href={"#"}
          title={"Entrar a mi cuenta"}
        >
          <UserIcon />
          <TextSpan>Usuario</TextSpan>
        </StaledLink>
        <StaledLink
          $endBorder={1}
          href={
            "https://api.whatsapp.com/send/?phone=593996501072&text=Hola, me interesa un producto. Necesito más información&type=phone_number&app_absent=1"
          }
          target="_blank"
          rel="noopener noreferrer"
          title={"Enviar mensaje por Whatsapp"}
        >
          <StylesWrapperWhatsApp $anim={1}>
            <WhatsappIcon title={"Enviar mensaje por Whatsapp"} />
          </StylesWrapperWhatsApp>
          <TextSpan>Chat</TextSpan>
        </StaledLink>
      </StyleNav>
    </StyledHeader>
  );
}

{
  /*  <StaledLink
              hidden={1}
              href={"/account/user-info"}
              title={"Ver mi cuenta"}
            >
              <StylesWrapper>
                <UserIcon />
                <p>Mi perfil</p>
              </StylesWrapper>
            </StaledLink> */
}
