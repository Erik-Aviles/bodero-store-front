import { useContext, useEffect, useState } from "react";
import ProductsGrid from "@/components/ProductsGrid";
import { DataContext } from "@/context/DataContext";
import filterSearch from "@/utils/filterSearch";
import { getData } from "@/utils/FetchData";
import Filter from "@/components/Filter";
import Button from "@/components/buttonComponents/Button";
import { useRouter } from "next/router";
import Title from "@/components/stylesComponents/Title";
import styled, { css } from "styled-components";
import Layout from "@/components/Layout";
import { brands } from "@/resource/data";
import { TitleH4 } from "@/components/stylesComponents/TitleH4";
import { FlexStyled } from "@/components/stylesComponents/Flex";
import BackButton from "@/components/buttonComponents/BackButton";
import { ButtonContainer } from "@/components/buttonComponents/ButtonContainer";

const CenterSecction = css`
  heigth: auto;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
  @media screen and (max-width: 480px) {
    margin-bottom: 0;
    padding: 0;
  }
  @media screen and (max-width: 640px) {
    padding-top: 109.63px;
    margin-bottom: 60px;
  }
`;
const CenterDiv = styled.section`
  ${CenterSecction}
`;

export default function SearchPage({ products, result }) {
  const { data } = useContext(DataContext);
  const [product, setProducts] = useState(products);

  const [page, setPage] = useState(1);
  const router = useRouter();

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

  const handleGoBack = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <Layout
      title="B.R.D | Busqueda de productos"
      description={`Contammos con marcas reconocidas como: ${brandNamesString}`}
    >
      <CenterDiv>
        <Filter data={data} />
        {product?.length === 0 ? (
          <TitleH4>Sin registro</TitleH4>
        ) : (
          <>
            <FlexStyled>
              <BackButton onClick={handleGoBack} />
              <Title>Busqueda de productos </Title>
            </FlexStyled>
            <ProductsGrid products={product} />
          </>
        )}

        {result < page * 20 ? (
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
  const search = query.search;

  const res = await getData(
    `products?limit=${
      page * 20
    }&category=${category}&sort=${sort}&title=${search}`
  );

  return {
    props: {
      products: res.products,
      result: res.result,
    },
  };
}
