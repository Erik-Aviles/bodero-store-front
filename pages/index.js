import CategoriesInStar from "@/components/categories/CategoriesInStar";
import NewProducts from "@/components/NewProducts";
import { Loading } from "@/components/Loading";
import Carousel from "@/components/Carousel";
import { fetcher } from "@/utils/fetcher";
import Brands from "@/components/Brands";
import Layout from "@/components/Layout";
import styled from "styled-components";
import { useState } from "react";
import useSWR from "swr";

const BackgroundColor = styled.div`
  background-color: #f7f7f7;
`;

export default function HomePage() {
  const [limit] = useState(10);
  const {
    data: pro,
    isLoading: isLoadingProducts,
    mutate: mutateProducts,
  } = useSWR(`/api/products?limit=${limit}`, fetcher);

  const {
    data: cat,
    isLoading: isLoadingCategories,
    mutate: mutateCategories,
  } = useSWR(`/api/categories/pagination?limit=${limit}`, fetcher);

  if (isLoadingProducts && isLoadingCategories) {
    return <Loading />;
  }

  return (
    <Layout
      title="B.R.D | INICIO"
      description="Tienda de repuestos y accesorios originales de moto en Quevedo"
    >
      <BackgroundColor>
        <Carousel />
        <CategoriesInStar categories={cat} isLoading={isLoadingCategories} />
        <NewProducts products={pro?.products} isLoading={isLoadingProducts} />
        <Brands />
      </BackgroundColor>
    </Layout>
  );
}
