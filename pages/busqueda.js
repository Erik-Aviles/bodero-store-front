import { useEffect, useState } from "react";
import ProductsGrid from "@/components/ProductsGrid";
import filterSearch from "@/utils/filterSearch";
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
import SearchComponent from "@/components/SearchComponent";
import Search from "@/components/Search";
import { getProducts } from "@/utils/FetchData";
import { normalizeQuery } from "@/utils/normalize";

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

export default function SearchPage() {
  const router = useRouter();
  const query = router.query;
  const page = typeof query.page === "string" ? Number(query.page) : 1;
  const limit = typeof query.limit === "string" ? Number(query.limit) : 20;
  const q =
    typeof query.q === "string" ? normalizeQuery(query.q.toLowerCase()) : "";
  const [filterValue, setFilterValue] = useState([]);

  useEffect(() => {
    if (q.length >= 3) {
      getProducts({ q, page, limit }).then((res) => {
        setFilterValue(res);
      });
    }
  }, [q]);

  console.log(filterValue);

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
        {/* <Filter /> */}
        <FlexStyled>
          <BackButton onClick={handleGoBack} />
          <Title>Busqueda de productos </Title>
        </FlexStyled>
        <Search search={normalizeQuery(q.toLowerCase())} />
        {!filterValue ? (
          <SkeletorProducts />
        ) : filterValue?.length === 0 ? (
          <TitleH4>Producto no registrado</TitleH4>
        ) : (
          <ProductsGrid products={filterValue} />
        )}
      </CenterDiv>
    </Layout>
  );
}

/* function buildUrl(baseUrl, query) {
  const url = new URL(baseUrl);

  const page = query.page || 1;
  const category = query.category || "all";
  const sort = query.sort || "";
  const q = query.q || "";

  url.searchParams.set("page", page);
  url.searchParams.set("category", category);
  url.searchParams.set("sort", sort);

  if (q !== undefined) {
    url.searchParams.set("title", q);
  }

  return url.toString();
}
export async function getServerSideProps(context) {
  const { query } = context;
  const page = query.page || 1;
  const category = query.category || "all";
  const sort = query.sort || "";
  const q = query.q || "";

  try {
    const response = await fetch(
      `${process.env.PUBLIC_URL}/api/search?q=${q}&sort=${sort}&page=${page}&category=${category}`,
      {
        headers: {
          "Content-Type": "application/json", // Ejemplo de otro encabezado
        },
      }
    );

    if (!response.ok) {
      throw new Error("La respuesta de la red no fue correcta");
    }

    const data = await response.json();
    return {
      props: {
        products: data,
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
 */
