import styled, { css } from "styled-components";
import { black, grey, greylight, primary, success, white } from "@/lib/colors";
import Link from "next/link";
import { WhatsappIcon } from "./Icons";
import { BsCardList, BsViewStacked } from "react-icons/bs";
import { SlUser } from "react-icons/sl";
import CartComponent from "./cart/CartComponent";
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
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  align-items: end;
  border-radius: 15px 15px 0 0;
  background-color: ${black};
`;

const StaledLink = styled(Link)`
  width: 100%;
  height: 100%;
  padding: 10px 0;
  gap: 5px;
  color: ${white};
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: end;
  border-right: 0.1px solid ${greylight};
  ${(props) =>
    props.$endBorder &&
    css`
      border-right: 0;
    `};
`;

const ButtonCart = styled.button`
  width: 100%;
  height: 100%;
  padding: 10px 0;
  gap: 5px;
  color: ${white};
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: transparent;
  justify-content: end;
  border-right: 0.1px solid ${greylight};
  ${(props) =>
    props.$endBorder &&
    css`
      border-right: 0;
    `};
`;
const StaledDiv = styled.div`
  width: 45px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.$active &&
    css`
      color: ${black};
      background: #f7f7f7;
      border-radius: 15px;
      p {
        color: #f7f7f7;
      }
    `}
`;

const StylesWrapperWhatsApp = styled.div`
  height: 20px;
  svg {
    cursor: pointer;
    font-size: 0.5rem;
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

  return (
    <StyledHeader>
      <StyleNav>
        <StaledLink href={"/products"} title={"Ver todos los productos"}>
          <StaledDiv $active={path === "/products" ? 1 : 0}>
            <BsCardList />
          </StaledDiv>
          <TextSpan>Productos</TextSpan>
        </StaledLink>
        <StaledLink href={"/categories"} title={"Ver categorias"}>
          <StaledDiv $active={path === "/categories" ? 1 : 0}>
            <BsViewStacked />
          </StaledDiv>
          <TextSpan>Categorias</TextSpan>
        </StaledLink>{" "}
        <ButtonCart title={"Ver mi pedido"}>
          <StaledDiv $active={path === "/carrito-de-compras" ? 1 : 0}>
            <CartComponent />
          </StaledDiv>
          <TextSpan>Carrito</TextSpan>
        </ButtonCart>
        {/*  <StaledLink href={"#"} title={"Entrar a mi cuenta"}>
          <StaledDiv $active={path === "#" ? 1 : 0}>
            <SlUser />
          </StaledDiv>
          <TextSpan>Usuario</TextSpan>
        </StaledLink> */}
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
