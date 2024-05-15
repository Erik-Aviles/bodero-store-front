import React, { useContext, useEffect, useState } from "react";
import { AllDeleteIcon, DeleteIcon } from "../Icons";
import formatPrice from "@/utils/formatPrice";
import { CartContext } from "@/context/CartContext";
import styled, { css } from "styled-components";
import { error, grey, greylight, success, white } from "@/lib/colors";
import Table from "../stylesComponents/Table";
import axios from "axios";
import { FlexStyled } from "../stylesComponents/Flex";
import Text from "../stylesComponents/HighlightedText";

const ProductInfoCell = styled.td`
  padding: 10px 0;
  font-weight: 700;
`;

const WrapperDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
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

const ProductImageBox = styled.div`
  width: 70px;
  height: 70px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 412px) {
    width: 80px;
    height: 80px;
    margin-bottom: 5px;
    img {
      max-width: 70px;
      max-height: 70px;
    }
  }
`;

const PropsSpan = styled.span`
  font-size: 0.6rem;
  ${(props) =>
    props.$two &&
    css`
      color: ${success};
    `};
`;

const QuantityLabel = styled.span`
  padding: 0 3px;
`;

const ButtonCart = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  padding: 2px 7px;
  cursor: pointer;
  &:active {
    background-color: ${greylight};
  }
  &:hover {
    background-color: ${greylight};
  }
  ${(props) =>
    props.$primary &&
    css`
      padding: 8px 12px;
      margin: 10px 0 0;
      text-transform: uppercase;
      background-color: ${success};
      color: ${white};
      border: 1px solid ${success};
      &:hover {
        background-color: ${white};
        color: ${success};
        border: 1px solid ${success};
      }
    `};
  &:disabled {
    cursor: not-allowed;
  }
  @media screen and (min-width: 768px) {
    padding: 5px 10px;
  }
`;

const TH = styled.th`
  width: 90px;
  @media screen and (min-width: 412px) {
    width: 120px;
  }
`;

const TD = styled.td`
  font-weight: bold;
  font-size: 1.2rem !important;
`;

const Message = styled.p`
  font-size: 0.8rem;
  margin: 0;
  color: ${grey};
  margin-left: 20px;
`;
const Flexdiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    margin: 10px 0;
  }
  ${(props) =>
    props.$end &&
    css`
      justify-content: flex-end;
      svg {
        &:hover {
          color: ${grey};
          cursor: pointer;
        }
      }
    `}
`;

const TableCart = () => {
  const {
    cartProducts,
    addProduct,
    removeProduct,
    removeOneProduct,
    clearCart,
    showCart,
    dropdownCart,
  } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }
  function deleteProduct(id) {
    removeOneProduct(id);
  }
  let total = 0;
  for (const productId of cartProducts) {
    const salePrice = products.find((p) => p._id === productId)?.salePrice || 0;
    total += salePrice;
  }

  return (
    <>
      {showCart && (
        <Flexdiv $end={1}>
          <AllDeleteIcon onClick={dropdownCart} width={25} height={25} />
        </Flexdiv>
      )}

      <Flexdiv>
        <h3>Tus productos en el carrito </h3>{" "}
        <Text>{cartProducts?.length}, Articulos</Text>{" "}
      </Flexdiv>
      {!cartProducts?.length && (
        <Message>
          El carrito esta vacio. Los productos adicionados se mostrarán aquí.
        </Message>
      )}
      {products?.length > 0 && (
        <Table>
          <thead>
            <tr>
              <TH>Producto</TH>
              <th>Unidades</th>
              <th>P. Und.</th>
              <th>Sub Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <ProductInfoCell>
                  <PropsSpan>
                    {"Ref: "}
                    {product.code.toUpperCase()}
                  </PropsSpan>
                  <ProductImageBox>
                    <img
                      title={product.name}
                      alt={product.title}
                      src={product.images[0]}
                    />
                  </ProductImageBox>
                  <PropsSpan $two={1}>{product.title.toUpperCase()}</PropsSpan>
                </ProductInfoCell>
                <td>
                  <WrapperDiv>
                    <ButtonCart
                      onClick={() => lessOfThisProduct(product._id)}
                      disabled={
                        cartProducts.filter((id) => id === product._id)
                          .length === 1
                      }
                    >
                      -
                    </ButtonCart>
                    <QuantityLabel>
                      {cartProducts.filter((id) => id === product._id).length}
                    </QuantityLabel>
                    <ButtonCart
                      onClick={() => moreOfThisProduct(product._id)}
                      disabled={
                        cartProducts.filter((id) => id === product._id)
                          .length >= product.quantity
                      }
                    >
                      +
                    </ButtonCart>
                  </WrapperDiv>
                </td>

                <td>{formatPrice(product.salePrice)}</td>
                <td>
                  {formatPrice(
                    cartProducts.filter((id) => id === product._id).length *
                      product.salePrice
                  )}
                </td>
                <td>
                  <ButtonCart
                    title="Eliminar este productos"
                    onClick={(e) => deleteProduct(product._id)}
                  >
                    <DeleteIcon fill={error} />
                  </ButtonCart>
                </td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              <TD>TOTAL</TD>
              <TD>{formatPrice(total)}</TD>
              <td>
                <ButtonCart
                  title="Eliminar todo los productos"
                  onClick={() => clearCart()}
                >
                  <DeleteIcon fill={error} />
                </ButtonCart>
              </td>
            </tr>
          </tbody>
        </Table>
      )}
    </>
  );
};

export default TableCart;
