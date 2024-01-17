import FilterOnlyCategories from "@/components/FilterOnlyCategories";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import Featured from "@/components/Featured";
import { Category } from "@/models/Category";
import Carousel from "@/components/Carousel";
import { Product } from "@/models/Product";
import Brands from "@/components/Brands";
import Head from "next/head";
import { HamburguerIcon } from "@/components/Icons";
import { useState } from "react";

export default function HomePage({ featureProduct, newProducts, categories }) {
  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <Head>
        <title>B.R.D | Quevedo</title>
      </Head>
      <FilterOnlyCategories categories={categories} show={showNav} />
      {/* <Featured product={featureProduct} /> */}
      <Carousel />
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
