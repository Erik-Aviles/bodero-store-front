import { LogoFull } from "./Logo";
import styled, { css } from "styled-components";
import { grey, primary, success, white } from "@/lib/colors";
import Link from "next/link";
import { ProductIcon, ShoppingIcon, UserIcon, WhatsappIcon } from "./Icons";
import InformationHeader from "./InformationHeader";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
import SearchAutoComplete from "./SearchAutoComplete";

const StyledHeader = styled.header`
  width: 100%;
  background-color: ${white};
  @media screen and (max-width: 640px) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    position: fixed;
    z-index: 1;
    padding: 15px 0;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  color: ${white};
  padding: 0 10px 0 40px;
  justify-content: space-between;
`;

const StyleNav = styled.nav`
  display: flex;
  place-items: center;
  p {
    font-size: 0.7rem;
    margin: 0;
  }
`;

const StaledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  color: ${grey};
`;

const StylesWrapper = styled.div`
  width: 50px;
  height: 35px;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    border: 1px solid #ced4da;
    background: transparent;
  }
`;
const StylesWrapperWhatsApp = styled.div`
  display: none;
  @media screen and (min-width: 640px) {
    color: ${primary};
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3 {
      font-size: 1.2rem;
      margin: 0;
    }
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
  }
`;

const StyledSpan = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${success};
  width: 15px;
  height: 15px;
  border-radius: 50%;
  top: -4px;
  right: -4px;
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);

  return (
    <StyledHeader>
      <InformationHeader />

      <Wrapper>
        <LogoFull href={"/"} />

        <SearchAutoComplete />

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
            <StylesWrapper>
              <ProductIcon />
            </StylesWrapper>
          </StaledLink>
          {/*  <StaledLink
              hidden={1}
              href={"/account/user-info"}
              title={"Ver mi cuenta"}
            >
              <StylesWrapper>
                <UserIcon />
                <p>Mi perfil</p>
              </StylesWrapper>
            </StaledLink> */}
          <StaledLink
            href={"/carrito-de-compras"}
            title={"Ver mi carrito de compras"}
          >
            <StylesWrapper>
              {cartProducts?.length > 0 && (
                <StyledSpan>
                  <span>{cartProducts?.length}</span>
                </StyledSpan>
              )}
              <ShoppingIcon />
            </StylesWrapper>
          </StaledLink>
          <StaledLink href={"#"} title={"Entrar a mi cuenta"}>
            <StylesWrapper>
              <UserIcon />
            </StylesWrapper>
          </StaledLink>
        </StyleNav>
      </Wrapper>
    </StyledHeader>
  );
}
