import { Loading } from "@/components/Loading";
import CategoriesComponent from "@/components/CategoriesComponent";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import Carousel from "@/components/Carousel";
import { Product } from "@/models/Product";
import Brands from "@/components/Brands";
import { dataCarousel } from "@/resource/data";
import Testimonios from "@/components/Testimonios";
import Layout from "@/components/Layout";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "@/context/DataContext";

export default function HomePage({ newProducts }) {
  const { data } = useContext(DataContext);
  const { categories } = data;

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

export async function getStaticProps() {
  await mongooseConnect();

  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });

  return {
    props: {
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
    revalidate: 10,
  };
}
