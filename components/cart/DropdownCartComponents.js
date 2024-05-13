import React from "react";
import styled, { css } from "styled-components";
import TableCart from "./TableCart";
import ButtonLink from "../buttonComponents/ButtonLink";

const DopDownContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  right: 0;
  background-color: transparent;
  ${"" /* background-color: transparent; */}
`;

const WrapperdDopDown = styled.div`
  position: absolute;
  right: 0;
  z-index: 3;
  top: 130px;
  width: 27rem;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
  ${(props) =>
    props.$isActive &&
    css`
      right: -27rem;
    `};
`;

const WrapperTableCart = styled.div`
  overflow: overlay;
  max-height: 25rem;
  padding: 0 1rem;
`;
const WrapperButtonCart = styled.div`
  padding: 1rem;
  width: 100%;
  display: flex;
  gap: 20px;
`;

const DropdownCartComponents = ({ dropdownCart }) => {
  return (
    <>
      <DopDownContainer onClick={dropdownCart} />
      <WrapperdDopDown>
        <WrapperTableCart>
          <TableCart />
        </WrapperTableCart>
        <WrapperButtonCart>
          <ButtonLink href={"/busqueda"} $black={1} $outline={1} $block={1}>
            Seguir comprando
          </ButtonLink>
          <ButtonLink href={"/carrito-de-compras"} $black $block={1}>
            Ver Carrito
          </ButtonLink>
        </WrapperButtonCart>
      </WrapperdDopDown>
    </>
  );
};
export default DropdownCartComponents;
