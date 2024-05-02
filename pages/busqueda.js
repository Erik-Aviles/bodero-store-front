import React, { Suspense, useEffect, useState } from "react";
import filterSearch from "@/utils/filterSearch";
import { useRouter } from "next/router";
import Title from "@/components/stylesComponents/Title";
import styled, { css } from "styled-components";
import Layout from "@/components/Layout";
import { brands } from "@/resource/data";
import BackButton from "@/components/buttonComponents/BackButton";
import { ButtonContainer } from "@/components/buttonComponents/ButtonContainer";
import ButtonDisabled from "@/components/buttonComponents/ButtonDisabled";
import SkeletorProducts from "@/components/skeletor/SkeletorProducts";
import { grey, secondary } from "@/lib/colors";
import SearchProducts from "@/components/SearchProducts";
import { removeAccents, removePluralEnding } from "@/utils/normalize";

const ProductsGrid = React.lazy(() => import("@/components/ProductsGrid"));

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

const Sorted = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.25rem;
`;

const BreadCrumb = styled.span`
  display: inline-flex;
  align-items: center;
`;

const Text = styled.span`
  font-size: 0.8rem;
  white-space: nowrap;
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

const FlexStyled = styled.section`
  display: Flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  justify-content: space-between;
  @media screen and (min-width: 640px) {
    flex-direction: row;
    align-items: center;
  }
`;

const stopwords = [
  "el",
  "la",
  "las",
  "los",
  "de",
  "y",
  "a",
  "en",
  "con",
  "para",
  "un",
  "una",
  "uno",
  "unas",
  "unos",
];

const SearchPage = () => {
  const router = useRouter();
  const query = router.query;
  const search = query.q || "";
  const [pages, setPages] = useState(1);

  const [searchResults, setSearchResults] = useState();

  async function FetchProductsFilter() {
    try {
      if (search.trim() === "") {
        setSearchResults([]);
        return;
      }
      if (search.length >= 3) {
        const searchParts = removeAccents(search.toLowerCase())
          .split(" ")
          .filter((part) => !stopwords.includes(part))
          .map((part) => removePluralEnding(part));

        const apiUrl = `/api/search?q=${searchParts}&page=${pages}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Error al obtener datos de la API");
        }
        const data = await response.json();

        const filteredResults = data.filter((item) => {
          const title = removeAccents(item.title.toLowerCase());
          const code = removeAccents(item.code.toLowerCase());
          const brand = removeAccents(item.brand.toLowerCase());
          const compatibilityModels = (item.compatibility || []).map((compat) =>
            removeAccents(compat.model.toLowerCase())
          );

          const matchesAllParts = searchParts.every((part) => {
            return (
              title.includes(part) ||
              code.includes(part) ||
              brand.includes(part) ||
              compatibilityModels.some((model) => model.includes(part))
            );
          });
          return matchesAllParts;
        });

        setSearchResults(filteredResults);
      }
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  }

  useEffect(() => {
    FetchProductsFilter();
  }, [search]);

  const handlePageChange = (newPage) => {
    setPages(newPage);
    filterSearch({ router, page: newPage });
  };
  const HandleSearch = (e) => {
    e.preventDefault();
    FetchProductsFilter();
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    router.back();
  };

  const onClear = () => {
    setSearchResults([]);
    router.push(`/busqueda`);
  };

  const hasNextPage = searchResults?.length === 20;

  const brandNames = brands.map((brand) => brand.name);
  const brandNamesString = brandNames.join(", ");

  return (
    <Layout
      title="B.R.D | Busqueda de productos"
      description={`Contamos con marcas reconocidas como: ${brandNamesString}`}
    >
      <CenterDiv>
        <FlexStyled aria-label="breadcrumb">
          <Sorted>
            <BackButton onClick={handleGoBack} />
            <Title>Búsqueda de productos </Title>
          </Sorted>
          <BreadCrumb aria-current="page">
            <BreadCrumb>
              <Text>Producto</Text>
            </BreadCrumb>
            <Divider> / </Divider>
            <Text $big={1}>
              {search ? search.toUpperCase() : "Todos los productos"}
            </Text>
          </BreadCrumb>
        </FlexStyled>
        <FlexStyled aria-label="breadcrumb">
          <Text>Resultados: {searchResults?.length}</Text>
          <SearchProducts
            search={search}
            onClear={onClear}
            HandleSearch={HandleSearch}
          />
        </FlexStyled>
      </CenterDiv>

      <Suspense fallback={<SkeletorProducts />}>
        <ProductsGrid products={searchResults} />
      </Suspense>
      <CenterDiv>
        {(hasNextPage === 20 || pages > 1) && (
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
};

export default SearchPage;
