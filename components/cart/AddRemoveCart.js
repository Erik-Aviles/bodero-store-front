import { CartContext } from "@/context/CartContext";
import { greylight } from "@/lib/colors";
import React, { useContext } from "react";
import styled, { css } from "styled-components";

const WrapperAddRemove = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 5px 8px;
  ${(props) =>
    props.$center &&
    css`
      justify-content: space-evenly;
    `}
  ${(props) =>
    props.$column &&
    css`
      @media screen and (max-width: 370px) {
        flex-direction: column;
      }
    `}
`;

const ButtonCart = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 4px 7px;
  cursor: pointer;
  &:active {
    background-color: ${greylight};
  }
  &:hover {
    background-color: ${greylight};
  }
  &:disabled {
    cursor: not-allowed;
  }
  @media screen and (min-width: 768px) {
    padding: 5px 10px;
  }
`;

const QuantityLabel = styled.span`
  padding: 0 3px;
`;

const AddRemoveCart = ({ product }) => {
  const { addProduct, removeProduct, cartProducts } = useContext(CartContext);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  return (
    <WrapperAddRemove>
      <ButtonCart
        onClick={() => lessOfThisProduct(product._id)}
        disabled={cartProducts.filter((id) => id === product._id).length === 0}
      >
        -
      </ButtonCart>
      <QuantityLabel>
        {cartProducts.filter((id) => id === product._id).length}
      </QuantityLabel>
      <ButtonCart
        onClick={() => moreOfThisProduct(product._id)}
        disabled={
          cartProducts.filter((id) => id === product._id).length >=
          product.quantity
        }
      >
        +
      </ButtonCart>
    </WrapperAddRemove>
  );
};

export default AddRemoveCart;
