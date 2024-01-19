import FilterOnlyCategories from "@/components/FilterOnlyCategories";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import Center from "@/components/Center";
import Head from "next/head";
import React from "react";
import styled, { css } from "styled-components";
import Title from "@/components/Title";
import { black, white } from "@/lib/colors";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 40px 0 80px;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const Box = styled.div`
  padding: 0 20px;
  height: fit-content;
  ${(props) =>
    props.black &&
    css`
      background-color: ${black};
      color: ${white};
    `};
  ${(props) =>
    props.white &&
    css`
      background-color: ${white};
      box-shadow: 1px 4px 20px rgb(0 0 0 / 20%);
    `};
  h3 {
    margin-top: 16px;
    font-size: 1.6rem;
    line-height: 2.4rem;
    font-weight: normal;
  }
  p {
    line-height: 1.6rem;
  }
`;

export default function DeliveryPage({ categories }) {
  return (
    <>
      <Head>
        <title>B.R.D | Padidos y entrega</title>
      </Head>
      <main>
        <FilterOnlyCategories categories={categories} />
        <Center>
          <Title>Información</Title>
          <Wrapper>
            <Box white={1}>
              <h3>¿Cómo Comprar?</h3>
              <p>
                Somos un equipo de profesionales capacitados para llevar tu
                marca al siguiente nivel. Trabajamos enfocados en nuestros
                clientes, conscientes de que su éxito es nuestro éxito.
              </p>
              <p>
                Contamos con expertos especializados en las diferentes áreas del
                marketing digital, lo que nos permite trabajar de manera
                integral y proponer estrategias 360º.
              </p>
            </Box>
            <Box white={1}>
              <h3>Tiempos de Entrega</h3>
              <p>
                Somos un equipo de profesionales capacitados para llevar tu
                marca al siguiente nivel. Trabajamos enfocados en nuestros
                clientes, conscientes de que su éxito es nuestro éxito.
              </p>
              <p>
                Contamos con expertos especializados en las diferentes áreas del
                marketing digital, lo que nos permite trabajar de manera
                integral y proponer estrategias 360º.
              </p>
            </Box>
          </Wrapper>
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
