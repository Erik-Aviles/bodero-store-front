import { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Layout from "@/components/Layout";
import BackButton from "@/components/buttonComponents/BackButton";
import TableCart from "@/components/cart/TableCart";
import { CenterSecction } from "@/components/stylesComponents/CenterSecction";
import { FlexStyled } from "@/components/stylesComponents/Flex";
import Title from "@/components/stylesComponents/Title";
import { CartContext } from "@/context/CartContext";
import { grey, white } from "@/lib/colors";
import { useHandleGoBack } from "@/hooks/useHandleGoBack";
import ShippingForm from "@/components/cart/ShippingForm";
import useAddress from "@/hooks/useAddress";
import OrderInfo from "@/components/OrderInfo";

const CenterDiv = styled.section`
  ${CenterSecction}
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media screen and (min-width: 769px) {
    grid-template-columns: 1fr 0.7fr;
    gap: 20px;
    margin: 20px 0 40px;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: fit-content;
  background-color: ${white};
  border-radius: 10px;
  padding: 15px;
  h3 {
    font-size: 1rem;
    margin: 0 0 20px;
  }
  p {
    font-size: 0.8rem;
    margin: 0;
    color: ${grey};
  }
  span {
    font-size: 0.8rem;
    margin: 0;
    color: ${grey};
  }

  ${(props) =>
    props.$form &&
    css`
      box-shadow: 1px 4px 20px rgb(0 0 0 / 20%);
    `}
  ${(props) =>
    props.$list &&
    css`
      display: flex;
      flex-direction: column;
      padding: 10px;
    `}
    @media screen and (min-width: 768px) {
    padding: 20px;
  }
`;

export default function CartPage() {
  const handleGoBack = useHandleGoBack();
  const { cartProducts, clearCart } = useContext(CartContext);
  const { shippingAddress, mutateAddress, isLoading } = useAddress();

  return (
    <Layout title="B.R.D | Mi carrito">
      <CenterDiv>
        <FlexStyled>
          <BackButton onClick={handleGoBack} />
          <Title>Carrito de compras</Title>
        </FlexStyled>
        <ColumnsWrapper>
          <Box $list={1}>
            <TableCart />
          </Box>
          {!!cartProducts?.length && (
            <Box $white={1}>
              <ShippingForm
                shippingAddress={shippingAddress}
                mutateAddress={mutateAddress}
                isLoading={isLoading}
                cartProducts={cartProducts}
                clearCart={clearCart}
              />
               <OrderInfo />
            </Box>
          )}
        </ColumnsWrapper>
      </CenterDiv>
    </Layout>
  );
}
