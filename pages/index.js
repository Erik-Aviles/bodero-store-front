import Brands from "@/components/Brands";
import Categories from "@/components/Categories";
import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import Head from "next/head";

export default function HomePage({ featureProduct, newProducts, categories }) {
  return (
    <>
      <Head>
        <title>B.R.D | Quevedo</title>
        <meta
          name="description"
          content="Taller y venta de repuestos de motos"
        />
      </Head>
      <main>
        <Categories categories={categories} />
        <Featured product={featureProduct} />
        <NewProducts products={newProducts} />
        <Brands />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "64ef827b325205e311834a94";
  await mongooseConnect();
  const featureProduct = await Product.findById(featuredProductId);
  const categories = await Category.find({}, null, {
    sort: { _id: -1 },
  });
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 8,
  });
  return {
    props: {
      featureProduct: JSON.parse(JSON.stringify(featureProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
