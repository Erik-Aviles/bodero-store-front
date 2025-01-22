import styled, { css } from "styled-components";
import { black, grey, greylight, primary, success, white } from "@/lib/colors";
import Link from "next/link";
import { WhatsappIcon } from "./Icons";
import { BsCardList, BsCart2, BsViewStacked } from "react-icons/bs";
import { SlUser } from "react-icons/sl";
import { useRouter } from "next/router";
import { useData } from "@/hooks/useData";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import useActions from "@/hooks/useActions";

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
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  justify-items: center;
  align-items: center;
  border-radius: 15px 15px 0 0;
  background-color: ${black};
  overflow-x: hidden;
  white-space: nowrap;
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

const ButtonOpenModal = styled.button`
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
  cursor: pointer;
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

const WrapperIcon = styled.div`
  position: relative;
  width: 16px;
  height: 16px;
  svg {
    height: 1em;
    width: 1em;
  }
  @media screen and (min-width: 767px) {
    width: 24px;
    height: 28px;
    svg {
      height: 24px;
      width: 24px;
    }
  }
`;
const StyledSpan = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${success};
  width: 14px;
  height: 14px;
  border-radius: 50%;
  top: 0px;
  right: -10px;
  font-size: 0.5rem;
  color: ${white};
  @media screen and (min-width: 767px) {
    width: 20px;
    height: 20px;
    right: -10px;
  }
`;

export default function NavMovil() {
  const router = useRouter();
  const path = router.asPath;
  const { section } = router.query;
  const { toggleAuthModal, toggleModalOpenCart } = useActions();
  const { cartProducts } = useContext(CartContext);
  const { company } = useData();
  const mainPhone = company?.mainPhone;

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
        <ButtonOpenModal title={"Ver mi pedido"} onClick={toggleModalOpenCart}>
          <StaledDiv $active={path === "/carrito-de-compras" ? 1 : 0}>
            <WrapperIcon>
              {cartProducts?.length > 0 && (
                <StyledSpan>{cartProducts?.length}</StyledSpan>
              )}
              <BsCart2 />
            </WrapperIcon>
          </StaledDiv>
          <TextSpan>Mi Carrito</TextSpan>
        </ButtonOpenModal>
        <ButtonOpenModal title={"Ver mi cuenta"} onClick={toggleAuthModal}>
          <StaledDiv
            $active={path === `/customer/mi-cuenta/${section}` ? 1 : 0}
          >
            <SlUser />
          </StaledDiv>
          <TextSpan>Mi Cuenta</TextSpan>
        </ButtonOpenModal>
        <StaledLink
          $endBorder={1}
          href={`https://api.whatsapp.com/send/?phone=593${mainPhone}&text=Hola, me interesa un producto. Necesito más información&type=phone_number&app_absent=1`}
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
