import React, { Suspense, useEffect, useState } from "react";
import filterSearch from "@/utils/filterSearch";
import { useRouter } from "next/router";
import Title from "@/components/stylesComponents/Title";
import styled, { css } from "styled-components";
import Layout from "@/components/Layout";
import BackButton from "@/components/buttonComponents/BackButton";
import { ButtonContainer } from "@/components/buttonComponents/ButtonContainer";
import ButtonDisabled from "@/components/buttonComponents/ButtonDisabled";
import SkeletorProducts from "@/components/skeletor/SkeletorProducts";
import { grey, secondary } from "@/lib/colors";
import SearchProducts from "@/components/SearchProducts";

import { brands } from "@/resource/brandsData";
import { fetchProductsFilter } from "@/utils/FetchProductsFilter";
import { CenterSecction } from "@/components/stylesComponents/CenterSecction";

const ProductsGrid = React.lazy(() => import("@/components/ProductsGrid"));

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

const SearchPage = () => {
  const router = useRouter();
  const query = router.query;
  const search = query.q || "";
  // const [pages, setPages] = useState(1);

  const [searchResults, setSearchResults] = useState();

  useEffect(() => {
    fetchProductsFilter(search, 4)
      .then((res) => {
        setSearchResults(res);
      })
      .catch((error) => {
        console.error("Error en la búsqueda:", error);
      });
  }, [search]);

  /*   const handlePageChange = (newPage) => {
    setPages(newPage);
    filterSearch({ router, page: newPage });
  }; */
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
        <FlexStyled aria-label="breadcrumb">
          <Text>Resultados: {searchResults?.length}</Text>
          <SearchProducts
            search={search}
            onClear={onClear}
            HandleSearch={HandleSearch}
          />
        </FlexStyled>
      </CenterDiv>
      <CenterDiv>
        <Suspense fallback={<SkeletorProducts />}>
          <ProductsGrid products={searchResults} />
        </Suspense>
      </CenterDiv>
      {/*     <CenterDiv>
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
      </CenterDiv>  */}
    </Layout>
  );
};

export default SearchPage;
