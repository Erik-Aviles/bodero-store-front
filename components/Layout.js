import Center from "@/components/Center";
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import Head from "next/head";
import styled from "styled-components";
import UserInfo from "./account/user-info";
import AsideInfoAccount from "./AsideInfoAccount";
import Categories from "./Categories";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.5fr;
  gap: 40px;
  margin: 20px 0 80px;
`;
export default function Layout({ children, categories }) {
  return (
    <>
      <Head>
        <title>B.D.R | Mi cuenta</title>
      </Head>
      <main>
        <Categories categories={categories} />
        <Center>
          <Title>Mi Cuenta</Title>
          <h4>
            Hola, <b>Erika</b>
          </h4>
          <ColumnsWrapper>
            <AsideInfoAccount />
            {children}
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
