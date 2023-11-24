import Categories from "@/components/Categories";
import Center from "@/components/Center";
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import { grey, white } from "@/lib/colors";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import Head from "next/head";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${white};
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  p {
    margin: 0;
  }
`;
const StylesInfo = styled.div`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgba(132, 135, 137, 0.1);
`;
const StylesTitle = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
`;
const StylesText = styled.p`
  font-size: 1rem;
  color: ${grey};
`;

export default function UserInfoPage({ categories }) {
  return (
    <>
      <Head>
        <title>B.D.R | Mi cuenta-persona</title>
      </Head>
      <main>
        <Categories categories={categories} />
        <Center>
          <Title>Mi Cuenta</Title>
          <Layout>
            <Wrapper>
              <StylesInfo>
                <StylesTitle>Nombre</StylesTitle>
                <StylesText>Erika Patricia Aviles Cortez</StylesText>
              </StylesInfo>
              <StylesInfo>
                <StylesTitle>Telefono</StylesTitle>
                <StylesText>0963616800</StylesText>
              </StylesInfo>
              <StylesInfo>
                <StylesTitle>Correo</StylesTitle>
                <StylesText>erik8822@hotmail.com</StylesText>
              </StylesInfo>
              <StylesInfo>
                <StylesTitle>Ciudad</StylesTitle>
                <StylesText>Quevedo</StylesText>
              </StylesInfo>
              <StylesInfo>
                <StylesTitle>Direccion</StylesTitle>
                <StylesText>Av. Jaime Roldos Aguilera</StylesText>
              </StylesInfo>
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
