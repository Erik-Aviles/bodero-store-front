import { greylight, primary, white } from "@/lib/colors";
import React from "react";
import styled, { css } from "styled-components";

const WrapperAddRemove = styled.div`
  width: 100%;
  max-width: 148.8px;
  display: flex;
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
      @media screen and (max-width: 400px) {
        flex-direction: column;
      }
    `}
`;

const ButtonCart = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 4px 10px;
  cursor: pointer;
  color: ${white};
  background-color: ${greylight};
  &:active {
    background-color: ${primary};
  }
  &:disabled {
    cursor: not-allowed;
    background-color: #f1f0f0;
    &:hover {
      background-color: #f1f0f0;
      color: ${greylight};
    }
  }
  &:hover {
    background-color: ${primary};
  }
  @media screen and (min-width: 768px) {
    padding: 5px 10px;
  }
`;

const QuantityLabel = styled.span`
  padding: 0 3px;
`;

const AddRemoveCart = ({
  product,
  addProduct,
  removeProduct,
  cartProducts,
}) => {
  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  return (
    <WrapperAddRemove>
      <ButtonCart
        onClick={() => lessOfThisProduct(product?._id)}
        disabled={
          cartProducts?.filter((id) => id === product?._id).length === 0
        }
      >
        -
      </ButtonCart>
      <QuantityLabel>
        {cartProducts.filter((id) => id === product?._id).length}
      </QuantityLabel>
      <ButtonCart
        onClick={() => moreOfThisProduct(product?._id)}
        disabled={
          cartProducts?.filter((id) => id === product?._id).length >=
          product?.quantity
        }
      >
        +
      </ButtonCart>
    </WrapperAddRemove>
  );
};

export default AddRemoveCart;
