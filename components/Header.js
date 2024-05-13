import { LogoFull } from "./Logo";
import styled, { css } from "styled-components";
import { black, grey, greylight, primary, white } from "@/lib/colors";
import Link from "next/link";
import { WhatsappIcon } from "./Icons";
import { BsCardList, BsViewStacked } from "react-icons/bs";
import { SlUser } from "react-icons/sl";

import InformationHeader from "./InformationHeader";
import SearchAutoComplete from "./SearchAutoComplete";
import { useRouter } from "next/router";
import CartComponent from "./cart/CartComponent";
import { useState } from "react";
import ToogleNavBar from "./buttonComponents/ButtonHamburger";
import DropdownCartComponents from "./cart/DropdownCartComponents";

const DisplayNoneCpmponente = styled.div`
  display: none;
  @media screen and (min-width: 769px) {
    display: block;
  }
`;

const StyledHeader = styled.header`
  width: 100%;
  background-color: ${white};
  ${"" /* border-bottom: 1px solid rgba(0, 0, 0, 0.125); */}
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.125);
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: 2;
  ${
    "" /*   @media screen and (max-width: 768px) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
    z-index: 2;
  } */
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;
  color: ${white};
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  @media screen and (max-width: 767px) {
    ${(props) =>
      props.$disable &&
      css`
        display: none;
      `};
  }
  @media screen and (min-width: 768px) {
    padding: 0 15px;
  }
`;

const StyleNav = styled.nav`
  width: 100%;
  display: flex;
  gap: 10px;
  place-items: center;
`;

const StaledLink = styled(Link)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${black};
  &:hover {
    color: ${primary};
  }
  ${(props) =>
    props.$active &&
    css`
      color: ${primary};
      p {
        color: ${primary};
      }
    `}
`;
const ButtonCart = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${black};
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    color: ${primary};
  }
  ${(props) =>
    props.$active &&
    css`
      color: ${primary};
      p {
        color: ${primary};
      }
    `}
`;

const StylesWrapper = styled.div`
  position: relative;
  svg {
    height: 1.5em;
    width: 1.5em;
  }
`;

const StylesWrapperWhatsApp = styled.div`
  position: relative;
  width: fit-content;
  color: ${primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg {
    cursor: pointer;
    font-size: 0.8rem;
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
  }
  h3 {
    display: none;
  }
  @media screen and (min-width: 1024px) {
    h3 {
      display: block;
      margin: 0;
      font-size: 1.6rem;
      ${"" /* display: none; */}
    }
  }
`;

const SectionRigthNav = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const TextSpan = styled.p`
  margin: 0;
  font-size: 0.6rem;
  white-space: nowrap;
  &:hover {
    color: ${primary};
  }
`;

export default function Header() {
  const router = useRouter();
  const path = router.pathname;
  const [showModal, setShowModal] = useState(false);
  const [showCart, setSetShowCart] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const dropdownCart = () => {
    setSetShowCart(!showCart);
  };

  return (
    <>
      <StyledHeader>
        <InformationHeader />
        <Wrapper $disable={path === "/busqueda" ? 1 : 0}>
          <DisplayNoneCpmponente>
            <SectionRigthNav>
              <LogoFull href={"/"} />
            </SectionRigthNav>
          </DisplayNoneCpmponente>
          <ToogleNavBar showModal={showModal} toggleModal={toggleModal} />
          <SearchAutoComplete />
          <DisplayNoneCpmponente>
            <SectionRigthNav>
              <StylesWrapperWhatsApp $anim={1}>
                <WhatsappIcon title={"Enviar mensaje por Whatsapp"} />
                <h3>0996501072</h3>
              </StylesWrapperWhatsApp>
              <StyleNav>
                <StaledLink
                  href={
                    "https://api.whatsapp.com/send/?phone=593996501072&text=Hola, me interesa un producto. Necesito más información&type=phone_number&app_absent=1"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  title={"Enviar mensaje por Whatsapp"}
                ></StaledLink>{" "}
                <StaledLink
                  $active={path === "/products" ? 1 : 0}
                  href={"/products"}
                  title={"Ver todos los productos"}
                >
                  <StylesWrapper>
                    <BsCardList />
                  </StylesWrapper>
                  <TextSpan>Productos</TextSpan>
                </StaledLink>
                <StaledLink
                  $active={path === "/categories" ? 1 : 0}
                  href={"/categories"}
                  title={"Ver todas las categorias"}
                >
                  <StylesWrapper>
                    <BsViewStacked />
                  </StylesWrapper>
                  <TextSpan>Categorias</TextSpan>
                </StaledLink>
                <ButtonCart
                  onClick={dropdownCart}
                  $active={path === "/carrito-de-compras" ? 1 : 0}
                  title={"Ver mi carrito de compras"}
                >
                  <StylesWrapper>
                    <CartComponent />
                  </StylesWrapper>
                  <TextSpan>Carrito</TextSpan>
                </ButtonCart>
                <StaledLink
                  $active={path === "#" ? 1 : 0}
                  href={"#"}
                  title={"Entrar a mi cuenta"}
                >
                  <StylesWrapper>
                    <SlUser />
                  </StylesWrapper>
                  <TextSpan>Mi cuenta</TextSpan>
                </StaledLink>
              </StyleNav>
            </SectionRigthNav>
          </DisplayNoneCpmponente>
        </Wrapper>
        {showCart && (
          <DropdownCartComponents
            showCart={showCart}
            dropdownCart={dropdownCart}
          />
        )}
      </StyledHeader>
    </>
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
