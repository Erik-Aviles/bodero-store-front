import { Loading } from "@/components/Loading";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import Carousel from "@/components/Carousel";
import { Product } from "@/models/Product";
import Brands from "@/components/Brands";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { dataCarousel } from "@/resource/carouselData";
import styled from "styled-components";
import CategoriesInStar from "@/components/categories/CategoriesInStar";

const BackgroundColor = styled.div`
  background-color: #f7f7f7;
`;

export default function HomePage({ newProducts }) {
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
      <BackgroundColor>
        <Carousel data={dataCarousel} />
        <CategoriesInStar />
        <NewProducts products={newProducts} />
        <Brands />
      </BackgroundColor>
    </Layout>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  }).select(
    "title salePrice brand code codeWeb codeEnterprise images compatibility quantity category"
  );

  return {
    props: {
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
