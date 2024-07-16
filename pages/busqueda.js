import BackButton from "@/components/buttonComponents/BackButton";
import useProductsFilter from "@/hooks/useProductsFilter";
import SearchProducts from "@/components/SearchProducts";
import Title from "@/components/stylesComponents/Title";
import ProductSearch from "@/components/ProductSearch";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { brands } from "@/resource/brandsData";
import filterSearch from "@/utils/filterSearch";
import styled, { css } from "styled-components";
import { grey, secondary } from "@/lib/colors";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

const CenterDiv = styled.section`
  margin: 0 auto;
  background: #f7f7f7;
  padding: 0 0 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media screen and (min-width: 640px) {
    padding: 0 40px 40px;
  }
`;
const Wrapper = styled.section``;

const Descriptionresults = styled.div`
  display: Flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  padding: 10px;
  @media screen and (min-width: 640px) {
    flex-direction: row;
    align-items: center;
  }
`;

const GroupedItems = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
`;

const Text = styled.span`
  font-size: 0.8rem;
  white-space: nowrap;
  color: ${grey};
  ${(props) =>
    props.$highlighted &&
    css`
      color: ${secondary};
      font-weight: 500;
    `};
`;

const TextMsg = styled.p`
  font-size: 1.3rem;
  color: ${grey};
  font-weight: 500;
  padding: 0 20px;
  margin: 0 0 8px;
  ${(props) =>
    props.$small &&
    css`
      font-size: 0.8rem;
      font-weight: 400;
    `};
`;
const Divider = styled.span`
  color: ${grey};
  padding-left: 0.3rem;
  padding-right: 0.3rem;
`;

const ResultsSession = styled.section`
  min-height: 250px;
`;

const SearchPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [pag, setPag] = useState(1);
  const pageSize = 20;
  const minLength = 3;

  useEffect(() => {
    const query = router.query.q;
    if (query) {
      setSearch(query);
      setPag(parseInt(router.query.page) || 1);
    }
  }, [router.query.q, router.query.page]);

  const { products, isLoading, isError, isValidating, totalProducts } =
    useProductsFilter(search, minLength, pag, pageSize);

  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchQuery = formData.get("search");
    setSearch(searchQuery.toLowerCase());
    filterSearch({ router, q: searchQuery.toLowerCase(), page: 1 });
  };

  const handlePageChange = (pagNum) => {
    setPag(pagNum);
    filterSearch({ router, q: search, page: pagNum });
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    router.back();
  };

  const onClear = () => {
    setSearch("");
    filterSearch({ router, q: "", page: "" });
  };

  const brandNames = brands.map((brand) => brand.name);
  const brandNamesString = brandNames.join(", ");

  return (
    <Layout
      title="B.R.D | Busqueda de productos"
      description={`Contamos con marcas reconocidas como: ${brandNamesString}`}
    >
      <CenterDiv>
        <Wrapper>
          <Descriptionresults aria-label="breadcrumb">
            <GroupedItems>
              <BackButton onClick={handleGoBack} />
              <Title>Búsqueda de productos </Title>
            </GroupedItems>
            {search && (
              <GroupedItems>
                <Text>Producto</Text>
                <Divider> / </Divider>
                <Text $highlighted={1}>
                  {search ? search.toUpperCase() : "Todos los productos"}
                </Text>
              </GroupedItems>
            )}
          </Descriptionresults>
          <Descriptionresults aria-label="breadcrumb">
            {!search ? (
              <Text>Resultados de la búsqueda</Text>
            ) : (
              <Text>
                Encontrado (<Text $highlighted={1}>{totalProducts}</Text>)
                Productos.
              </Text>
            )}

            <SearchProducts
              name="search"
              value={search}
              onClick={onClear}
              onSubmit={handleSearch}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Descriptionresults>
        </Wrapper>

        <ResultsSession>
          {products && (
            <>
              <ProductSearch
                products={products}
                isLoading={isLoading}
                isValidating={isValidating}
                isError={isError}
              />
              <Pagination
                currentPage={pag}
                onPageChange={handlePageChange}
                totalPages={Math.ceil(totalProducts / pageSize)}
                isLoading={isLoading || isValidating}
              />
            </>
          )}
          {!search && (
            <>
              <TextMsg>
                No se han encontrado coincidencias con tu búsqueda
              </TextMsg>
              <TextMsg $small={1}>
                Usa otras palabras para describir lo que necesitas
              </TextMsg>
            </>
          )}
        </ResultsSession>
      </CenterDiv>
    </Layout>
  );
};
export default SearchPage;

/* const SearchPage = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [pag, setPag] = useState(1);
  const minLength = 3;

  useEffect(() => {
    const query = router.query.q;
    if (query) {
      setSearch(query);
      filterSearch({ router, q: query, page: pag > 1 ? pag : null });
    }
  }, [router.query.q, pag]);

  const { products, isLoading, isError } = useProductsFilter(search, minLength);

  const totalProductsFound = products?.length;

  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchQuery = formData.get("search");
    setSearch(searchQuery);
    filterSearch({ router, q: searchQuery, page: pag > 1 ? pag : null });
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    router.back();
  };

  const onClear = () => {
    setSearch("");
    filterSearch({ router, q: "", page: "" });
  };

  const brandNames = brands.map((brand) => brand.name);
  const brandNamesString = brandNames.join(", ");

  return (
    <Layout
      title="B.R.D | Busqueda de productos"
      description={`Contamos con marcas reconocidas como: ${brandNamesString}`}
    >
      <CenterDiv>
        <Wrapper>
          <Descriptionresults aria-label="breadcrumb">
            <GroupedItems>
              <BackButton onClick={handleGoBack} />
              <Title>Búsqueda de productos </Title>
            </GroupedItems>
            {search && (
              <GroupedItems>
                <Text>Producto</Text>
                <Divider> / </Divider>
                <Text $highlighted={1}>
                  {search ? search.toUpperCase() : "Todos los productos"}
                </Text>
              </GroupedItems>
            )}
          </Descriptionresults>
          <Descriptionresults aria-label="breadcrumb">
            {!search ? (
              <Text>Resultados de la búsqueda</Text>
            ) : (
              <Text>
                Cantidad de productos:{" "}
                <Text $highlighted={1}>{totalProductsFound}</Text>
              </Text>
            )}

            <SearchProducts
              name="search"
              value={search}
              onClick={onClear}
              onSubmit={handleSearch}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Descriptionresults>
        </Wrapper>

        <ResultsSession>
          {products ? (
            <ProductSearch
              products={products}
              isLoading={isLoading}
              isError={isError}
            />
          ) : (
            <>
              <TextMsg>
                No se han encontrado coincidencias con tu búsqueda
              </TextMsg>
              <TextMsg $small={1}>
                Usa otras palabras para describir lo que necesitas
              </TextMsg>
            </>
          )}
        </ResultsSession>
      </CenterDiv>
    </Layout>
  );
};
export default SearchPage;
 */

/* <form onSubmit={handleSearch}>
<input
  type="text"
  name="search"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search for products"
/>
<button type="submit">Buscar</button>
</form> */

/* const SearchPage = () => {
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

export default SearchPage; */
