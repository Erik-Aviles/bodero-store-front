import FilterOnlyCategories from "@/components/FilterOnlyCategories";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import Featured from "@/components/Featured";
import { Category } from "@/models/Category";
import Carousel from "@/components/Carousel";
import { Product } from "@/models/Product";
import Brands from "@/components/Brands";
import Head from "next/head";

export default function HomePage({ newProducts, categories }) {
  return (
    <>
      <Head>
        <title>B.R.D | Quevedo</title>
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <main>
        <FilterOnlyCategories categories={categories} />
        {/* <Featured product={featureProduct} /> */}
        <Carousel />
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
