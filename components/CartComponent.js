import { CartContext } from "@/context/CartContext";
import { success, white } from "@/lib/colors";
import React, { useContext } from "react";
import styled from "styled-components";
import { ShoppingIcon } from "./Icons";

const WrapperIcon = styled.div`
  position: relative;
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
  font-size: 0.6rem;
  color: ${white};
`;

const CartComponent = () => {
  const { cartProducts } = useContext(CartContext);
  return (
    <WrapperIcon>
      {cartProducts?.length > 0 && (
        <StyledSpan>{cartProducts?.length}</StyledSpan>
      )}
      <ShoppingIcon />
    </WrapperIcon>
  );
};

export default CartComponent;
