import Categories from "@/components/Categories";
import Center from "@/components/Center";
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import { error, grey, success, warning, white } from "@/lib/colors";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Order } from "@/models/Order";
import Head from "next/head";
import { useState } from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  background-color: ${white};
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 1px 4px 20px rgb(0 0 0 / 20%);
  h4,
  p {
    margin: 0;
  }
  h4 {
    font-size: 1.5rem;
    font-weight: 500;
  }
`;
const StylesInfo = styled.article`
  min-height: 150px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgba(132, 135, 137, 0.1);
`;

const StylesSpan = styled.span`
  margin-left: 10px;
  font-size: 0.8rem;
  font-weight: 500;
  ${(props) =>
    props.warning &&
    css`
      color: ${warning};
    `};
  ${(props) =>
    props.error &&
    css`
      color: ${error};
    `};
  ${(props) =>
    props.success &&
    css`
      color: ${success};
    `};
`;
const StylesCart = styled.div`
  font-size: 1rem;
  color: ${grey};
  padding: 13px;
  border-bottom: 1px solid rgba(132, 135, 137, 0.1);
`;

const StylesTime = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
`;

const CantProducts = styled.p`
  padding-top: 13px;
`;

export default function OrderInfoPage({ categories, orders }) {
  return (
    <>
      <Head>
        <title>B.D.R | Mi cuenta-Pedidos</title>
      </Head>
      <main>
        <Categories categories={categories} />
        <Center>
          <Title>Mi Cuenta</Title>
          <Layout>
            <Wrapper>
              <h4>Todos los pedidos</h4>
              {orders === undefined ? (
                <StylesInfo>
                  Los pedidos realizados se mostrarán aquí. Aun no regristra
                  pedidos
                </StylesInfo>
              ) : (
                <>
                  {orders.length > 0 &&
                    orders?.map((order) => (
                      <StylesInfo>
                        <StylesTime>
                          {new Date(order.createdAt).toLocaleString()}
                          {order.paid ? (
                            <StylesSpan success={1}>Entregado</StylesSpan>
                          ) : (
                            <StylesSpan warning={1}>Pendiente</StylesSpan>
                          )}
                        </StylesTime>
                        {order.line_items.map((l) => (
                          <StylesCart>
                            <p>Producto: {l.price_data?.product_data?.name}</p>
                            <p>Cantidad: {l.quantity}</p>
                            <p>Precio c/u: ${l.price_data.unit_amount}</p>
                            <p>
                              Valor Total: $
                              {l.price_data.unit_amount * l.quantity}
                            </p>
                          </StylesCart>
                        ))}
                        <CantProducts>
                          Cant. Total de producto: {order.line_items.length}
                        </CantProducts>
                        <p>
                          Pago por pedido: <strong>$1200</strong>
                        </p>
                      </StylesInfo>
                    ))}
                </>
              )}
            </Wrapper>
          </Layout>
        </Center>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const categories = await Category.find({}, null, { sort: { _id: -1 } });
  const orders = await Order.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}
