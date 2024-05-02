import { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import filterSearch from "@/utils/filterSearch";
import { grey, secondary } from "@/lib/colors";
import { useRouter } from "next/router";
import { CenterSecction } from "@/components/stylesComponents/CenterSecction";
import { ButtonContainer } from "@/components/buttonComponents/ButtonContainer";
import Layout from "@/components/Layout";
import { TitleH4 } from "@/components/stylesComponents/TitleH4";
import BackButton from "@/components/buttonComponents/BackButton";
import { FlexStyled } from "@/components/stylesComponents/Flex";
import { DataContext } from "@/context/DataContext";
import ProductsGrid from "@/components/ProductsGrid";
import ButtonDisabled from "@/components/buttonComponents/ButtonDisabled";
import SkeletorProducts from "@/components/skeletor/SkeletorProducts";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const CenterDiv = styled.section`
  ${CenterSecction}
`;

const Sorted = styled.div`
  display: inline-flex;
  align-items: center;
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.25rem;
  @media screen and (max-width: 640px) {
    padding-left: 1.2rem;
  }
`;

const BreadCrumb = styled.span`
  display: inline-flex;
  align-items: center;
`;

const Text = styled.span`
  font-size: 0.8rem;
  color: ${grey};
  ${(props) =>
    props.$big &&
    css`
      color: ${secondary};
      font-weight: 500;
    `};
`;

const Divider = styled.span`
  color: ${grey};
  padding-left: 0.3rem;
  padding-right: 0.3rem;
`;

export default function CategoriesPage() {
  const { categories } = useContext(DataContext);
  const router = useRouter();
  const query = router.query;
  const [pages, setPages] = useState(1);

  let apiUrl = `/api/search?limit=20&page=${pages}&category=${query.category}`;

  const { data: products } = useSWR(`${apiUrl}`, fetcher);

  const handlePageChange = (newPage) => {
    setPages(newPage);
    filterSearch({ router, page: newPage });
  };

  const hasNextPage = products?.length === 20;

  const handleGoBack = (e) => {
    e.preventDefault();
    if (router.query.page > 1) {
      setPages(pages - 1);
      filterSearch({ router, page: pages - 1 });
    } else {
      router.push("/");
    }
  };

  const resultadoFiltrado = categories.filter((objeto) =>
    objeto._id.includes(router.query.category)
  );

  const nameCategory = resultadoFiltrado[0]?.name;

  return (
    <Layout
      title="B.R.D | Categoria"
      description="Repuestos Originales en diferentes marcas que hacen la diferencia"
    >
      <CenterDiv>
        <FlexStyled aria-label="breadcrumb">
          <BackButton onClick={handleGoBack} />
          <Sorted>
            <BreadCrumb>
              <Text>Categoría</Text>
            </BreadCrumb>
            <BreadCrumb aria-current="page">
              <Divider> / </Divider>
              <Text $big={1}>
                {nameCategory ? nameCategory.toUpperCase() : "Todas"}
              </Text>
            </BreadCrumb>
          </Sorted>
        </FlexStyled>
        {!products ? (
          <SkeletorProducts />
        ) : products?.length === 0 ? (
          <TitleH4>
            No se encontró productos en &ldquo;{nameCategory}
            &rdquo;
          </TitleH4>
        ) : (
          <ProductsGrid products={products} />
        )}

        {products?.length >= 20 && (
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

/* function buildUrl(baseUrl, query) {
  const url = new URL(baseUrl);

  const page = query.page || 1;
  const category = query.category || "all";

  url.searchParams.set("page", page);
  url.searchParams.set("category", category);

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
} */
