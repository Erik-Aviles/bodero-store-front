import { Loading } from "@/components/Loading";
import CategoriesComponent from "@/components/CategoriesComponent";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import Carousel from "@/components/Carousel";
import { Product } from "@/models/Product";
import Brands from "@/components/Brands";
import { dataCarousel } from "@/resource/data";
import Testimonios from "@/components/Testimonios";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";

export default function HomePage({ newProducts, categories }) {
  const [isUpLoanding, setIsUpLoanding] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsUpLoanding(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (isUpLoanding) {
    return <Loading />;
  }

  return (
    <Layout
      title="B.R.D | INICIO"
      description="Tienda de repuestos y accesorios originales de moto en Quevedo"
    >
      <CategoriesComponent categories={categories} />
      <Carousel data={dataCarousel} />
      <NewProducts products={newProducts} />
      <Brands />
      <Testimonios />
    </Layout>
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
    limit: 10,
  });

  return {
    props: {
      featureProduct: JSON.parse(JSON.stringify(featureProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
