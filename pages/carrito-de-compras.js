import CategoriesComponent from "@/components/CategoriesComponent";
import { AllDeleteIcon, DeleteIcon } from "@/components/Icons";
import Layout from "@/components/Layout";
import SuccessSend from "@/components/SuccessSend";
import BackButton from "@/components/buttonComponents/BackButton";
import { CenterSecction } from "@/components/stylesComponents/CenterSecction";
import { FlexStyled } from "@/components/stylesComponents/Flex";
import Input from "@/components/stylesComponents/Input";
import Table from "@/components/stylesComponents/Table";
import Title from "@/components/stylesComponents/Title";
import { CartContext } from "@/context/CartContext";
import { DataContext } from "@/context/DataContext";
import { error, grey, greylight, success, white } from "@/lib/colors";
import formatPrice from "@/utils/formatPrice";

import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";

const CenterDiv = styled.section`
  ${CenterSecction}
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin: 40px 0;
  gap: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 0.7fr;
    gap: 40px;
    margin: 0 0 40px;
  }
`;

const Box = styled.div`
  width: 100%;
  background-color: ${white};
  border-radius: 10px;
  padding: 0 10px;
  h3 {
    font-size: 1.3rem;
    margin: 0 0 20px;
  }
  p {
    font-size: 1rem;
    margin: 0;
    color: ${grey};
    margin-left: 20px;
  }
  ${(props) =>
    props.form &&
    css`
      box-shadow: 1px 4px 20px rgb(0 0 0 / 20%);
    `}
  ${(props) =>
    props.list &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `}
    @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
  font-weight: 700;
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

const TitleSpan = styled.span`
  font-size: 0.5rem;
  color: ${success};
`;
const QuantityLabel = styled.span`
  padding: 0 3px;
`;

const WrapperDiv = styled.div`
  display: flex;
  gap: 1px;
  @media screen and (min-width: 768px) {
    gap: 5px;
  }
`;

const ButtonCart = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  padding: 2px 7px;
  cursor: pointer;
  &:active {
    background-color: ${greylight};
  }
  ${(props) =>
    props.$more &&
    css`
      pa
    `};
  @media screen and (min-width: 768px) {
    padding: 5px 10px;
  }
`;

export default function CartPage() {
  const router = useRouter();
  const { categories } = useContext(DataContext);
  const { asPath } = router;

  const {
    cartProducts,
    addProduct,
    removeProduct,
    removeOneProduct,
    clearCart,
  } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (asPath === "undefined") {
      return;
    }
    if (asPath?.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }
  function deleteProduct(id) {
    removeOneProduct(id);
  }
  function deleteProductAll() {
    clearCart();
  }
  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      phone,
      city,
      streetAddress,
      country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  let total = 0;
  for (const productId of cartProducts) {
    const salePrice = products.find((p) => p._id === productId)?.salePrice || 0;
    total += salePrice;
  }
  const handleGoBack = (e) => {
    e.preventDefault();
    if (router.query.page > 1) {
      setPages(pages - 1);
      filterSearch({ router, page: pages - 1 });
    } else {
      router.push("/");
    }
  };

  if (asPath?.includes("success") || isSuccess) {
    return (
      <Layout title="B.R.D | Mi carrito - envio exitoso">
        <SuccessSend />
      </Layout>
    );
  }
  return (
    <Layout title="B.R.D | Mi carrito">
      <CategoriesComponent categories={categories} />
      <CenterDiv>
        <FlexStyled>
          <BackButton onClick={handleGoBack} />
          <Title>Carrito de compras</Title>
        </FlexStyled>
        <ColumnsWrapper>
          <Box list={1}>
            {!cartProducts?.length && (
              <p>
                El carrito esta vacio. Los productos adicionados se mostrarán
                aquí.
              </p>
            )}

            {products?.length > 0 && (
              <>
                <h3>Tus productos en el carrito </h3>
                <Table>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th></th>
                      <th>Und.</th>
                      <th>P. Und.</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <ProductInfoCell>
                          <ProductImageBox>
                            <img
                              title={product.name}
                              alt={product.title}
                              src={product.images[0]}
                            />
                          </ProductImageBox>
                          <TitleSpan>{product.title.toUpperCase()}</TitleSpan>
                        </ProductInfoCell>
                        <td>
                          <WrapperDiv>
                            <ButtonCart
                              onClick={() => lessOfThisProduct(product._id)}
                            >
                              -
                            </ButtonCart>
                            <ButtonCart
                              onClick={() => moreOfThisProduct(product._id)}
                            >
                              +
                            </ButtonCart>
                          </WrapperDiv>
                        </td>
                        <td>
                          <QuantityLabel>
                            {
                              cartProducts.filter((id) => id === product._id)
                                .length
                            }
                          </QuantityLabel>
                        </td>
                        <td>{formatPrice(product.salePrice)}</td>
                        <td>
                          {formatPrice(
                            cartProducts.filter((id) => id === product._id)
                              .length * product.salePrice
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
                      <td></td>
                      <td>TOTAL</td>
                      <td>{formatPrice(total)}</td>
                      <td>
                        <ButtonCart
                          title="Eliminar todo los productos"
                          onClick={() => deleteProductAll()}
                        >
                          <DeleteIcon fill={error} />
                        </ButtonCart>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box white={1}>
              <h3>Información de envío </h3>
              <Input
                type="text"
                placeholder="Nombre"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Correo"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Teléfono"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <WrapperDiv>
                <Input
                  type="text"
                  placeholder="Ciudad"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </WrapperDiv>

              <Input
                type="text"
                placeholder="Dirección"
                name="streetAddress"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
              />
              <Input
                type="text"
                placeholder="País"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <ButtonCart onClick={goToPayment}>Enviar pedido</ButtonCart>
            </Box>
          )}
        </ColumnsWrapper>
      </CenterDiv>
    </Layout>
  );
}
