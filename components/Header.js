import { useContext } from "react";
import Logo from "./Logo";
import styled, { css } from "styled-components";
import { CartContext } from "./CartContext";
import { grey, white } from "@/lib/colors";
import Link from "next/link";
import { ProductIcon, ShoppingIcon, UserIcon, WhatsappIcon } from "./Icons";
import Information from "./Information";
import Center from "./Center";

const StyledHeader = styled.header``;

const Wrapper = styled.div`
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

  h3 {
    font-size: 1.5rem;
    margin: 0;
  }
  p {
    margin: 0;
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  return (
    <StyledHeader>
      <Information />
      <Center>
        <Wrapper>
          <Logo href={"/"} />
          <StyleNav>
            <StaledLink
              href={
                "https://api.whatsapp.com/send/?phone=593996501072&text&type=phone_number&app_absent=1"
              }
              target="_blank"
              rel="noopener noreferrer"
              title={"Enviar mensaje por Whatsapp"}
            >
              <StylesSpan>
                <WhatsappIcon />
                <p>Escribenos</p>
                <h3>0996501072</h3>
              </StylesSpan>
            </StaledLink>

            {/* <StaledLink href={"/products"} title={"Ver todos los productos"}>
            <StylesSpan>
              <ProductIcon />
              <p>Productos</p>
            </StylesSpan>
          </StaledLink> */}
          </StyleNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
