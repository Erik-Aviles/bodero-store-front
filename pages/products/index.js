import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductsGrid from "@/components/ProductsGrid";
import { DataContext } from "@/context/DataContext";
import filterSearch from "@/utils/filterSearch";
import { getData } from "@/utils/FetchData";
import Button from "@/components/buttonComponents/Button";
import Title from "@/components/stylesComponents/Title";
import styled from "styled-components";
import Layout from "@/components/Layout";
import { brands } from "@/resource/data";
import CategoriesComponent from "@/components/CategoriesComponent";
import { ButtonContainer } from "@/components/buttonComponents/ButtonContainer";
import { CenterSecction } from "@/components/stylesComponents/CenterSecction";
import { TitleH4 } from "@/components/stylesComponents/TitleH4";
import BackButton from "@/components/buttonComponents/BackButton";
import { FlexStyled } from "@/components/stylesComponents/Flex";

const CenterDiv = styled.section`
  ${CenterSecction}
`;

export default function ProductsPage({ products, result }) {
  const { data } = useContext(DataContext);
  const { categories } = data;
  const [product, setProducts] = useState(products);

  const [page, setPage] = useState(1);
  const router = useRouter();

  const handleGoBack = (e) => {
    e.preventDefault();
    router.back();
  };

  useEffect(() => {
    setProducts(products);
  }, [products]);

  useEffect(() => {
    if (Object.keys(router.query).length === 0) setPage(1);
  }, [router.query]);

  const handleLoadmore = () => {
    setPage(page + 1);
    filterSearch({ router, page: page + 1 });
  };

  const brandNames = brands.map((brand) => brand.name);
  const brandNamesString = brandNames.join(", ");

  return (
    <Layout
      title="B.R.D | Todos los Productos"
      description={`Marcas reconocidas como: ${brandNamesString}`}
    >
      <CategoriesComponent categories={categories} />
      <CenterDiv>
        <FlexStyled>
          <BackButton onClick={handleGoBack} />
          <Title>Todos los productos</Title>
        </FlexStyled>
        {product?.length === 0 ? (
          <TitleH4>Sin registro</TitleH4>
        ) : (
          <ProductsGrid products={product} />
        )}
        {result < page * 10 ? (
          ""
        ) : (
          <ButtonContainer>
            <Button $black={1} $outline={1} $size="m" onClick={handleLoadmore}>
              Cargar más
            </Button>
          </ButtonContainer>
        )}
      </CenterDiv>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search || "all";

  const res = await getData(
    `products?limit=${
      page * 10
    }&category=${category}&sort=${sort}&title=${search}`
  );

  return {
    props: {
      products: res.products,
      result: res.result,
    },
  };
}
