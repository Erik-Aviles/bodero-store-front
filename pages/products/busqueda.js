import { useContext, useEffect, useState } from "react";
import { DataContext } from "@/context/DataContext";
import ProductsGrid from "@/components/ProductsGrid";
import filterSearch from "@/utils/filterSearch";
import Filter from "@/components/Filter";
import { useRouter } from "next/router";
import Title from "@/components/stylesComponents/Title";
import styled, { css } from "styled-components";
import Layout from "@/components/Layout";
import { brands } from "@/resource/data";
import { TitleH4 } from "@/components/stylesComponents/TitleH4";
import { FlexStyled } from "@/components/stylesComponents/Flex";
import BackButton from "@/components/buttonComponents/BackButton";
import { ButtonContainer } from "@/components/buttonComponents/ButtonContainer";
import ButtonDisabled from "@/components/buttonComponents/ButtonDisabled";
import SkeletorProducts from "@/components/skeletor/SkeletorProducts";

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

export default function SearchPage({ products }) {
  const { categories } = useContext(DataContext);
  const [product, setProducts] = useState(products);
  const [pages, setPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    setProducts(products);
  }, [products]);

  const handlePageChange = (newPage) => {
    setPages(newPage);
    filterSearch({ router, page: newPage });
  };

  const hasNextPage = products?.length === 20;

  const brandNames = brands.map((brand) => brand.name);
  const brandNamesString = brandNames.join(", ");

  const handleGoBack = (e) => {
    e.preventDefault();
    if (router.query.page > 1) {
      setPages(pages - 1);
      filterSearch({ router, page: pages - 1 });
    }
    if (!router.query) {
      router.push("/");
    } else {
      router.back();
    }
  };

  return (
    <Layout
      title="B.R.D | Busqueda de productos"
      description={`Contammos con marcas reconocidas como: ${brandNamesString}`}
    >
      <CenterDiv>
        <Filter categories={categories} />
        <FlexStyled>
          <BackButton onClick={handleGoBack} />
          <Title>Busqueda de productos </Title>
        </FlexStyled>
        {!product ? (
          <SkeletorProducts />
        ) : product?.length === 0 ? (
          <TitleH4>Producto no registrado</TitleH4>
        ) : (
          <ProductsGrid products={product} />
        )}
        {product?.length >= 20 && (
          <ButtonContainer>
            <ButtonDisabled
              $black
              onClick={() => handlePageChange(pages - 1)}
              disabled={pages === 1}
            >
              Anterior
            </ButtonDisabled>
            <ButtonDisabled
              $white
              onClick={() => handlePageChange(pages + 1)}
              disabled={!hasNextPage}
            >
              Siguiente
            </ButtonDisabled>
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
