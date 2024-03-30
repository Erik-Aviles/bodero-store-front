import { useContext, useEffect, useState } from "react";
import { DataContext } from "@/context/DataContext";
import ProductsGrid from "@/components/ProductsGrid";
import filterSearch from "@/utils/filterSearch";
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
  const { categories } = useContext(DataContext);
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
        <Filter categories={categories} />
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

function buildUrl(baseUrl, query) {
  const url = new URL(baseUrl);

  const page = query.page || 1;
  const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search || "";

  url.searchParams.set("page", page);
  url.searchParams.set("category", category);
  url.searchParams.set("sort", sort);

  if (search !== undefined) {
    url.searchParams.set("title", search);
  }

  return url.toString();
}
export async function getServerSideProps(context) {
  const { query } = context;
  const apiUrl = `${process.env.PUBLIC_URL}/api/products`;
  const finalUrl = buildUrl(apiUrl, query);

  try {
    const response = await fetch(finalUrl, {
      headers: {
        "Content-Type": "application/json", // Ejemplo de otro encabezado
      },
    });

    if (!response.ok) {
      throw new Error("La respuesta de la red no fue correcta");
    }

    const data = await response.json();
    return {
      props: {
        products: data.products,
        result: data.result,
      },
    };
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return {
      props: {
        error: "Error al obtener los datos ",
      },
    };
  }
}
