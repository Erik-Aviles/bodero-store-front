import CategoriesInStar from "@/components/categories/CategoriesInStar";
import NewProducts from "@/components/NewProducts";
import useCategories from "@/hooks/useCategories";
import { Loading } from "@/components/Loading";
import useProducts from "@/hooks/useProducts";
import Carousel from "@/components/Carousel";
import Brands from "@/components/Brands";
import Layout from "@/components/Layout";
import styled from "styled-components";
import { useState } from "react";

const BackgroundColor = styled.div`
  background-color: #f7f7f7;
`;

export default function HomePage() {
  const [limit] = useState(10);
  const { data: products, isLoadingProducts } = useProducts(limit);
  const { categories, isLoadingCategories } = useCategories(limit);

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
        <CategoriesInStar
          categories={categories}
          isLoading={isLoadingCategories}
        />
        <NewProducts products={products} isLoading={isLoadingProducts} />
        <Brands />
      </BackgroundColor>
    </Layout>
  );
}
