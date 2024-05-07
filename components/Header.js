import { LogoFull } from "./Logo";
import styled, { css } from "styled-components";
import { grey, greylight, primary, white } from "@/lib/colors";
import Link from "next/link";
import { ProductIcon, UserIcon, WhatsappIcon } from "./Icons";
import InformationHeader from "./InformationHeader";
import SearchAutoComplete from "./SearchAutoComplete";
import { useRouter } from "next/router";
import CartComponent from "./CartComponent";

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
  place-items: center;
`;

const StaledLink = styled(Link)`
  position: relative;
  display: flex;
  text-decoration: none;
  color: ${grey};
`;

const StylesWrapper = styled.div`
  width: 50px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    border-radius: 0.5rem;
    border: 0.3px solid ${greylight};
    cursor: pointer;
  }
`;

const StylesWrapperWhatsApp = styled.div`
  font-size: 1.2rem;
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
    margin: 0;
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

  return (
    <StyledHeader>
      <InformationHeader />
      <Wrapper $disable={path === "/busqueda" ? 1 : 0}>
        <DisplayNoneCpmponente>
          <SectionRigthNav>
            <LogoFull href={"/"} />
          </SectionRigthNav>
        </DisplayNoneCpmponente>
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
                <StylesWrapper>
                  <ProductIcon />
                </StylesWrapper>
              </StaledLink>
              <StaledLink
                href={"/carrito-de-compras"}
                title={"Ver mi carrito de compras"}
              >
                <StylesWrapper>
                  <CartComponent />
                </StylesWrapper>
              </StaledLink>
              <StaledLink href={"#"} title={"Entrar a mi cuenta"}>
                <StylesWrapper>
                  <UserIcon />
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
