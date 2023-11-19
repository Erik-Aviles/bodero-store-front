import Categories from "@/components/Categories";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import Head from "next/head";

export default function ProductsPage({ products, categories }) {
  return (
    <>
      <Head>
        <title>B.R.D | Productos</title>
        <meta
          name="description"
          content="Repuestos Originales  en diferentes marcas que hacen la diferencia"
        />
      </Head>
      <main>
        <Categories categories={categories} />
        <Center>
          <Title>Todos los productos</Title>
          <ProductsGrid products={products} />
        </Center>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  const categories = await Category.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
