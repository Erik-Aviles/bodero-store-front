import { LogoFull } from "./Logo";
import styled, { css } from "styled-components";
import { black, grey, greylight, primary, white } from "@/lib/colors";
import Link from "next/link";
import { ProductIcon, UserIcon, WhatsappIcon } from "./Icons";
import { BsCardList } from "react-icons/bs";
import { SlUser } from "react-icons/sl";

import InformationHeader from "./InformationHeader";
import SearchAutoComplete from "./SearchAutoComplete";
import { useRouter } from "next/router";
import CartComponent from "./CartComponent";
import { useState } from "react";
import ToogleNavBar from "./buttonComponents/ButtonHamburger";

const DisplayNoneCpmponente = styled.div`
  display: none;
  @media screen and (min-width: 769px) {
    display: block;
  }
`;

const StyledHeader = styled.header`
  width: 100%;
  background-color: ${white};
  @media screen and (max-width: 768px) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
    z-index: 2;
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
`;

const StyleNav = styled.nav`
  display: flex;
  gap: 5px;
  place-items: center;
`;

const StaledLink = styled(Link)`
  position: relative;
  display: flex;

  text-decoration: none;
  color: ${black};
  &:hover {
    color: ${primary};
  }
`;

const StylesWrapper = styled.div`
  width: 50px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    border-radius: 0.5rem;
    border: 0.3px solid ${primary};
    cursor: pointer;
  }
  svg {
    height: 1.5em;
    width: 1.5em;
  }
  ${(props) =>
    props.$active &&
    css`
      border-radius: 0.5rem;
      border: 0.3px solid ${primary};
      p {
        color: #f7f7f7;
      }
    `}
`;

const StylesWrapperWhatsApp = styled.div`
  width: fit-content;

  color: ${primary};
  position: relative;
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

export default function Header() {
  const router = useRouter();
  const path = router.pathname;
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
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
              <StaledLink href={"/products"} title={"Ver todos los productos"}>
                <StylesWrapper $active={path === "/products" ? 1 : 0}>
                  <BsCardList />
                </StylesWrapper>
              </StaledLink>
              <StaledLink
                href={"/carrito-de-compras"}
                title={"Ver mi carrito de compras"}
              >
                <StylesWrapper $active={path === "/carrito-de-compras" ? 1 : 0}>
                  <CartComponent />
                </StylesWrapper>
              </StaledLink>
              <StaledLink href={"#"} title={"Entrar a mi cuenta"}>
                <StylesWrapper $active={path === "#" ? 1 : 0}>
                  <SlUser />
                </StylesWrapper>
              </StaledLink>
            </StyleNav>
          </SectionRigthNav>
        </DisplayNoneCpmponente>
      </Wrapper>
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
