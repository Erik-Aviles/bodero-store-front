import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import Head from "next/head";

export default function AccountPage({ categories }) {
  return (
    <>
      <Head>
        <title>B.D.R | Usuario</title>
      </Head>
      <main>
        <Header categories={categories} />
        <Center>
          <Title>Mi Cuenta</Title>
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
