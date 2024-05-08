import { CartContext } from "@/context/CartContext";
import { success, white } from "@/lib/colors";
import React, { useContext } from "react";
import styled from "styled-components";
import { BsCart2 } from "react-icons/bs";

const WrapperIcon = styled.div`
  position: relative;
  width: 16px;
  height: 16px;
  svg {
    height: 1em;
    width: 1em;
  }
  @media screen and (min-width: 767px) {
    width: 20px;
    height: 20px;
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

const CartComponent = () => {
  const { cartProducts } = useContext(CartContext);
  return (
    <WrapperIcon>
      {cartProducts?.length > 0 && (
        <StyledSpan>{cartProducts?.length}</StyledSpan>
      )}
      <BsCart2 />
    </WrapperIcon>
  );
};

export default CartComponent;
