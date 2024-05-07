import { Loading } from "@/components/Loading";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import Carousel from "@/components/Carousel";
import { Product } from "@/models/Product";
import Brands from "@/components/Brands";
import Layout from "@/components/Layout";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "@/context/DataContext";
import SearchAutoComplete from "@/components/SearchAutoComplete";
import { dataCarousel } from "@/resource/carouselData";
import styled from "styled-components";

const DisplayNoneCpmponente = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: end;
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
      <Carousel data={dataCarousel} />
      <NewProducts products={newProducts} />
      <Brands />
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
