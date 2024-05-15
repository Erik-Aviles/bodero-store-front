import React, { useContext } from "react";
import styled, { css } from "styled-components";
import TableCart from "./TableCart";
import ButtonLink from "../buttonComponents/ButtonLink";
import { CartContext } from "@/context/CartContext";
import { white } from "@/lib/colors";

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  right: 0;
  background-color: transparent;

  ${"" /* background-color: transparent; */};
`;
const DopDownContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  right: 0;
  background-color: rgba(37, 37, 37, 0.5);
  filter: blur(5px);
  ${"" /* background-color: transparent; */}
`;

const WrapperdDopDown = styled.div`
  position: absolute;
  right: 0;
  z-index: 3;
  top: 20px;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
  background-color: ${white};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const WrapperTableCart = styled.div`
  overflow: overlay;
  padding: 1rem 1rem 0;
  max-height: calc(100vh - 100px);
`;

const WrapperButtonCart = styled.div`
  padding: 1rem;
  width: 100%;
  display: flex;
  gap: 20px;
`;

const DropdownCartComponents = () => {
  const { dropdownCart } = useContext(CartContext);
  return (
    <Container>
      <DopDownContainer onClick={dropdownCart} />
      <WrapperdDopDown>
        <WrapperTableCart>
          <TableCart dropdownCart={dropdownCart} />
        </WrapperTableCart>
        <WrapperButtonCart>
          <ButtonLink
            onClick={dropdownCart}
            href={"/busqueda"}
            $black={1}
            $outline={1}
            $block={1}
          >
            Seguir comprando
          </ButtonLink>
          <ButtonLink
            onClick={dropdownCart}
            href={"/carrito-de-compras"}
            $black
            $block={1}
          >
            Ver Carrito
          </ButtonLink>
        </WrapperButtonCart>
      </WrapperdDopDown>
    </Container>
  );
};
export default DropdownCartComponents;
