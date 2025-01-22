import ToogleNavBar from "./buttonComponents/ButtonHamburger";
import { BsCardList, BsViewStacked } from "react-icons/bs";
import SearchAutoComplete from "./SearchAutoComplete";
import { black, primary, white } from "@/lib/colors";
import InformationHeader from "./InformationHeader";
import useProductsAll from "@/hooks/useProductsAll";
import CartComponent from "./cart/CartComponent";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import { SlUser } from "react-icons/sl";
import { WhatsappIcon } from "./Icons";
import { useState } from "react";
import { LogoFull } from "./Logo";
import Link from "next/link";
import { useData } from "@/hooks/useData";
import AuthModal from "./auth/AuthModal";
import useActions from "@/hooks/useActions";
import CartModal from "./cart/CartModal";

const DisplayNoneCpmponente = styled.div`
  display: none;
  @media screen and (min-width: 769px) {
    display: block;
  }
`;

const StyledHeader = styled.header`
  width: 100%;
  background-color: ${white};
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.125);
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: 2;
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
  @media screen and (min-width: 769px) {
    padding: 0 15px;
    height: 109.69px;
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
const ButtonOppenModal = styled.button`
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
  const {
    modalOpenAuth,
    modalOpenMenu,
    modalOpenCart,
    toggleAuthModal,
    toggleModalOpenMenu,
    toggleModalOpenCart,
  } = useActions();
  const { company } = useData();
  const mainPhone = company?.mainPhone;
  const { products, isError, isLoading, mutate } = useProductsAll();

  const router = useRouter();
  const path = router.asPath;
  const { section } = router.query;



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
          <ToogleNavBar
            showModal={modalOpenMenu}
            toggleModal={toggleModalOpenMenu}
          />
          <SearchAutoComplete allProducts={products} />
          <DisplayNoneCpmponente>
            <SectionRigthNav>
              <StyleNav>
                {mainPhone && (
                  <StylesWrapperWhatsApp $anim={1}>
                    <StaledLink
                      href={`https://api.whatsapp.com/send/?phone=593${mainPhone}&text=Hola, me interesa un producto. Necesito más información&type=phone_number&app_absent=1`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={"Enviar mensaje por Whatsapp"}
                    >
                      <WhatsappIcon title={"Enviar mensaje por Whatsapp"} />
                    </StaledLink>
                    <h3>0{mainPhone}</h3>
                  </StylesWrapperWhatsApp>
                )}
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
                <ButtonOppenModal
                  $active={path === `/customer/mi-cuenta/${section}` ? 1 : 0}
                  onClick={toggleAuthModal}
                  title={"Entrar a mi cuenta"}
                >
                  <StylesWrapper>
                    <SlUser />
                  </StylesWrapper>
                  <TextSpan>Mi Cuenta</TextSpan>
                </ButtonOppenModal>
                <ButtonOppenModal
                  $active={path === "/carrito-de-compras" ? 1 : 0}
                  onClick={toggleModalOpenCart}
                  title={"Ver mi carrito de compras"}
                >
                  <StylesWrapper>
                    <CartComponent />
                  </StylesWrapper>
                  <TextSpan>Carrito</TextSpan>
                </ButtonOppenModal>
              </StyleNav>
            </SectionRigthNav>
          </DisplayNoneCpmponente>
        </Wrapper>
      </StyledHeader>
      <AuthModal isOpen={modalOpenAuth} toggleModal={toggleAuthModal} />
      <CartModal isOpen={modalOpenCart} toggleModal={toggleModalOpenCart} />
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
