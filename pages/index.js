import Brands from "@/components/Brands";
import Featured from "@/components/Featured";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import Head from "next/head";
import { Category } from "@/models/Category";
import Categories from "@/components/Categories";

export default function HomePage({ featureProduct, newProducts, categories }) {
  return (
    <>
      <Head>
        <title>B.R.D | Quevedo</title>
      </Head>
      <Categories categories={categories} />
      <Featured product={featureProduct} />
      <NewProducts products={newProducts} />
      <Brands />
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
    limit: 3,
  });

  return {
    props: {
      featureProduct: JSON.parse(JSON.stringify(featureProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
