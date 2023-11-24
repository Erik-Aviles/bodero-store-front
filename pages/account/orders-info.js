import Categories from "@/components/Categories";
import Center from "@/components/Center";
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import { error, grey, success, warning, white } from "@/lib/colors";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import Head from "next/head";
import { useState } from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  background-color: ${white};
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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

export default function OrderInfoPage({ categories }) {
  const [order, setOrder] = useState();

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
              <h4>Todos los pedidos realizados</h4>
              {order === null ? (
                <StylesInfo>Sin pedido registrado...</StylesInfo>
              ) : (
                <>
                  <StylesInfo>
                    <StylesTime>
                      02/10/2024 <StylesSpan error>Cancelado</StylesSpan>
                    </StylesTime>
                    <StylesCart>
                      <p>Producto: Telefono SG - Cantidad: 2</p>
                      <p>Precio c/u: $100</p>
                      <p>Precio Total: $200</p>
                    </StylesCart>
                    <StylesCart>
                      <p>Producto: Moto Gp - Cantidad: 1</p>
                      <p>Precio c/u: $1000</p>
                      <p>Precio Total: $1000</p>
                    </StylesCart>
                    <p>Cant. Total de producto: 3 </p>
                    <p>Pago por pedido: $1200</p>
                  </StylesInfo>
                  <StylesInfo>
                    <StylesTime>
                      06/12/2020 <StylesSpan warning>Pendiente</StylesSpan>
                    </StylesTime>
                    <StylesCart>
                      <p>Producto: Yamaha - Cantidad: 2</p>
                      <p>Precio c/u: $3000</p>
                      <p>Precio Total: $6000</p>
                    </StylesCart>
                    <p>Cant. Total de producto: 2 </p>
                    <p>Pago por pedido: $6000</p>
                  </StylesInfo>
                  <StylesInfo>
                    <StylesTime>
                      06/12/2020 <StylesSpan success>Pagado</StylesSpan>
                    </StylesTime>
                    <StylesCart>
                      <p>Producto: Yamaha - Cantidad: 2</p>
                      <p>Precio c/u: $3000</p>
                      <p>Precio Total: $6000</p>
                    </StylesCart>
                    <p>Cant. Total de producto: 2 </p>
                    <p>Pago por pedido: $6000</p>
                  </StylesInfo>
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
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
