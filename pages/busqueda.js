import React, { Suspense, useEffect, useState } from "react";
import Title from "@/components/stylesComponents/Title";
import styled, { css } from "styled-components";
import Layout from "@/components/Layout";
import BackButton from "@/components/buttonComponents/BackButton";
import SkeletorProducts from "@/components/skeletor/SkeletorProducts";
import { grey, secondary } from "@/lib/colors";
import SearchProducts from "@/components/SearchProducts";
import { brands } from "@/resource/brandsData";
import Pagination from "@/components/Pagination";
import {
  refreshProductsFilter,
  useProductsFilter,
} from "@/hooks/useProductsFilter";
import { useRouter } from "next/router";
import { Loader } from "@/components/Loader";
import filterSearch from "@/utils/filterSearch";
import { fetchProductsFilter } from "@/utils/FetchProductsFilter";

const ProductsGrid = React.lazy(() => import("@/components/ProductsGrid"));

const CenterDiv = styled.section`
  heigth: auto;
  margin: 0 auto;
  background: #f7f7f7;
  @media screen and (min-width: 640px) {
    padding: 0 40px !important;
  }
  @media screen and (min-width: 1024px) {
    padding: 0 60px;
  }
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
  gap: 5px;
`;
const ContentEnd = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 5px;
  @media screen and (min-width: 640px) {
    flex-direction: column;
    align-items: center;
    justify-content: end;
    flex-direction: row;
    gap: 20px;
  }
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

const WithOutContentStyled = styled.div`
  padding: 10px;
  height: 250px;
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

const SearchPage = () => {
  const router = useRouter();
  const query = router.query;
  const search = query.q || "";
  const pages = query.page || 1;

  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const resultsPerPage = 20;

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const loadResults = async () => {
      try {
        const allResults = await fetchProductsFilter(search, 3, signal);
        setTotalResults(allResults.length);
        const paginatedResults = allResults.slice(
          (pages - 1) * resultsPerPage,
          pages * resultsPerPage
        );
        setSearchResults(paginatedResults);
      } catch (error) {
        if (error.name !== "Error de cancelación") {
          console.error("No se pudieron obtener los productos:", error);
        }
      }
    };
    loadResults();
    return () => {
      abortController.abort();
    };
  }, [search, pages]);

  const HandleSearch = (e) => {
    e.preventDefault();
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    router.back();
  };

  const onClear = () => {
    setSearchResults([]);
    router.push(`/busqueda`);
  };

  const totalAccumulator = searchResults?.length;

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
          {search && (
            <BreadCrumb aria-current="page">
              <BreadCrumb>
                <Text>Producto</Text>
              </BreadCrumb>
              <Divider> / </Divider>
              <Text $big={1}>
                {search ? search.toUpperCase() : "Todos los productos"}
              </Text>
            </BreadCrumb>
          )}
        </FlexStyled>
        <ContentEnd aria-label="breadcrumb">
          <BreadCrumb>
            {!search ? (
              <Text>Resultados de la busqueda</Text>
            ) : (
              <>
                <Text $big={1}>
                  {pages > 1 ? "+" : ""}
                  {totalAccumulator}
                </Text>
                <Text>{"de"}</Text>
                <Text $big={1}>{totalResults}</Text>
              </>
            )}
          </BreadCrumb>
          <SearchProducts
            search={search}
            onClear={onClear}
            HandleSearch={HandleSearch}
          />
        </ContentEnd>
        {search ? (
          <>
            <Suspense fallback={<SkeletorProducts />}>
              <ProductsGrid products={searchResults} />
            </Suspense>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              currentPage={parseInt(pages, 10)}
            />
          </>
        ) : (
          <WithOutContentStyled>SIN BUSQUEDA...</WithOutContentStyled>
        )}
      </CenterDiv>
    </Layout>
  );
};

export default SearchPage;
