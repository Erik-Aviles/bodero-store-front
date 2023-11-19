import { useContext } from "react";
import Logo from "./Logo";
import styled from "styled-components";
import { CartContext } from "./CartContext";
import { grey, white } from "@/lib/colors";
import Link from "next/link";
import { ProductIcon, ShoppingIcons, UserIcons, WhatsappIcons } from "./Icons";
import Information from "./Information";

const StyledHeader = styled.header`
  padding-bottom: 10px;
`;

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
  color: ${white};
`;

const StyleNav = styled.nav`
  display: flex;
  gap: 20px;
`;

const StaledLink = styled(Link)`
  font-size: 0.8rem;
  display: flex;
  text-decoration: none;
  cursor: pointer;
  color: ${grey};
  &:hover {
    color: #ccc;
  }
`;

const StylesSpan = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
      <Wrapper>
        <Logo href={"/"} />
        <StyleNav>
          <StaledLink
            href={
              "https://api.whatsapp.com/send/?phone=593996501072&text&type=phone_number&app_absent=1"
            }
            target="_blank"
            rel="noopener noreferrer"
            title={"Whatsapp"}
          >
            <StylesSpan>
              <WhatsappIcons />
              <p>Escribenos</p>
              <h3>0996501072</h3>
            </StylesSpan>
          </StaledLink>

          <StaledLink href={"/products"} title={"Whatsapp"}>
            <StylesSpan>
              <ProductIcon />
              <p>Productos</p>
            </StylesSpan>
          </StaledLink>

          {/*             <StaledLink hoverTwo href={"/account"} title={"Ver mi cuenta"}>
              <StylesSpan>
                <UserIcons />
                <p>Mi cuenta</p>
              </StylesSpan>
            </StaledLink> */}

          <StaledLink href={"/cart"} title={"Ver mi carrito"}>
            <StylesSpan>
              <ShoppingIcons />
              <p>Carrito ({cartProducts?.length})</p>
            </StylesSpan>
          </StaledLink>
        </StyleNav>
      </Wrapper>
    </StyledHeader>
  );
}
