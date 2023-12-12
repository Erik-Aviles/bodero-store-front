import Categories from "@/components/Categories";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import Head from "next/head";
import React from "react";

export default function DeliveryPage({ categories }) {
  return (
    <>
      <Head>
        <title>B.R.D | Padidos y entrega</title>
      </Head>
      <Categories categories={categories} />
      <main>
        <Center>Padidos y entrega</Center>
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
