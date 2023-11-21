import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Categories from "@/components/Categories";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import SuccessSend from "@/components/SuccessSend";
import Table from "@/components/Table";
import Title from "@/components/Title";
import { white } from "@/lib/colors";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin: 40px 0 80px;
`;
const Box = styled.div`
  background-color: ${white};
  border-radius: 10px;
  padding: 20px;
  h3 {
    font-size: 1.5rem;
  }
`;
const ProductInfoCell = styled.td`
  padding: 10px 0;
`;
const ProductImageBox = styled.div`
  width: 80px;
  height: 80px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  img {
    max-width: 70px;
    max-height: 70px;
  }
`;
const QuantityLabel = styled.span`
  padding: 0 3px;
`;
const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function CartPage({ categories }) {
  const router = useRouter();
  const { asPath } = router;

  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
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
  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      phone,
      city,
      postalCode,
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
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  if (asPath?.includes("success") || isSuccess) {
    return (
      <>
        <Head>
          <title>B.R.D | Mi carrito - Envio exitoso</title>
        </Head>
        <main>
          <Categories categories={categories} />
          <SuccessSend />
        </main>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>B.R.D | Mi carrito </title>
      </Head>
      <main>
        <Categories categories={categories} />
        <Center>
          <Title>Mi Pedido</Title>
          <ColumnsWrapper>
            <Box>
              {!cartProducts?.length && <p>Tu carrito esta vacio</p>}{" "}
              {products?.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio U.</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <ProductInfoCell>
                          <ProductImageBox>
                            <img src={product.images[0]} />
                          </ProductImageBox>
                          {product.name}
                        </ProductInfoCell>
                        <td>
                          <Button
                            onClick={() => lessOfThisProduct(product._id)}
                          >
                            -
                          </Button>
                          <QuantityLabel>
                            {
                              cartProducts.filter((id) => id === product._id)
                                .length
                            }
                          </QuantityLabel>
                          <Button
                            onClick={() => moreOfThisProduct(product._id)}
                          >
                            +
                          </Button>
                        </td>
                        <td>
                          {"$ "}
                          {product.price}
                        </td>
                        <td>
                          {"$ "}
                          {cartProducts.filter((id) => id === product._id)
                            .length * product.price}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>Total</td>
                      <td>$ {total}</td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </Box>
            {!!cartProducts?.length && (
              <Box>
                <h3>Informacion de envio </h3>
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
                <CityHolder>
                  <Input
                    type="text"
                    placeholder="Ciudad"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Codigo Postal"
                    name="postalCode"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </CityHolder>

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
                <Button block={1} black={1} onClick={goToPayment}>
                  Enviar pedido
                </Button>
              </Box>
            )}
          </ColumnsWrapper>
        </Center>
      </main>
    </>
  );
}
export async function getServerSideProps() {
  await mongooseConnect();
  const categories = await Category.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
