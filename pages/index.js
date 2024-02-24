import CategoriesComponent from "@/components/CategoriesComponent";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import Carousel from "@/components/Carousel";
import { Product } from "@/models/Product";
import Brands from "@/components/Brands";
import Head from "next/head";
import { dataCarousel } from "@/resource/data";

export default function HomePage({ newProducts, categories }) {
  return (
    <>
      <Head>
        <title>B.R.D | Quevedo</title>
      </Head>
      <main>
        <CategoriesComponent categories={categories} />
        <Carousel data={dataCarousel} />
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
    limit: 9,
  });

  return {
    props: {
      featureProduct: JSON.parse(JSON.stringify(featureProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
