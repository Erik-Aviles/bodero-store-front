import { useContext, useEffect, useState } from "react";
import CategoriesComponent from "@/components/CategoriesComponent";
import styled, { css } from "styled-components";
import filterSearch from "@/utils/filterSearch";
import { grey, secondary } from "@/lib/colors";
import Button from "@/components/buttonComponents/Button";
import { useRouter } from "next/router";
import { CenterSecction } from "@/components/stylesComponents/CenterSecction";
import { ButtonContainer } from "@/components/buttonComponents/ButtonContainer";
import Layout from "@/components/Layout";
import { TitleH4 } from "@/components/stylesComponents/TitleH4";
import BackButton from "@/components/buttonComponents/BackButton";
import { FlexStyled } from "@/components/stylesComponents/Flex";
import { DataContext } from "@/context/DataContext";
import ProductsGrid from "@/components/ProductsGrid";

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
  color: ${grey};
  ${(props) =>
    props.$big &&
    css`
      color: ${secondary};
      font-size: 1rem;
      font-weight: 500;
    `};
`;

const Divider = styled.span`
  color: ${grey};
  padding-left: 0.3rem;
  padding-right: 0.3rem;
`;

export default function CategoriesPage({ products, result }) {
  const { categories } = useContext(DataContext);
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

  const resultadoFiltrado = categories.filter((objeto) =>
    objeto._id.includes(router.query.category)
  );

  return (
    <Layout
      title="B.R.D | Categoria"
      description="Repuestos Originales en diferentes marcas que hacen la diferencia"
    >
      <CategoriesComponent categories={categories} />
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
                {resultadoFiltrado[0]?.name
                  ? resultadoFiltrado[0]?.name
                  : "Todas"}
              </Text>
            </BreadCrumb>
          </Sorted>
        </FlexStyled>
        {product?.length === 0 ? (
          <TitleH4>
            No se encontró productos en &ldquo;{resultadoFiltrado[0]?.name}
            &rdquo;
          </TitleH4>
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

function buildUrl(baseUrl, query) {
  const url = new URL(baseUrl);

  const page = query.page || 1;
  const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search;

  url.searchParams.set("page", page);
  url.searchParams.set("category", category);
  url.searchParams.set("sort", sort);

  if (search !== undefined) {
    url.searchParams.set("search", search);
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
