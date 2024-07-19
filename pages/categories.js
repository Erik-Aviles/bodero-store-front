import { ButtonContainer } from "@/components/buttonComponents/ButtonContainer";
import ButtonDisabled from "@/components/buttonComponents/ButtonDisabled";
import SkeletorCategories from "@/components/skeletor/SkeletorCategories";
import useProductsFilterForCategory from "@/hooks/useProductsFilterForCategory";
import ProductSearchForCategory from "@/components/ProductSearchForCategory";
import BackButton from "@/components/buttonComponents/BackButton";
import Text from "@/components/stylesComponents/HighlightedText";
import Title from "@/components/stylesComponents/Title";
import ItemCard from "@/components/categories/ItemCard";
import Pagination from "@/components/Pagination";
import styled, { css } from "styled-components";
import filterSearch from "@/utils/filterSearch";
import { grey, secondary } from "@/lib/colors";
import { Loader } from "@/components/Loader";
import { useEffect, useState } from "react";
import { fetcher } from "@/utils/fetcher";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import useSWR from "swr";

const ContentSection = styled.section`
  height: auto;
  margin: 0 auto;
  background: #f7f7f7;
  padding: 40px 0;
  @media screen and (min-width: 640px) {
    padding: 40px;
  }
`;

const Wrapper = styled.div``;

const Sorted = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
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
  gap: 4px;
`;

const Divider = styled.span`
  color: ${grey};
  padding-left: 0.3rem;
  padding-right: 0.3rem;
`;

const ListCategory = styled.ul`
  display: grid;
  grid-template-columns: minmax(100px, 1fr);
  grid-template-rows: minmax(100px, 1fr);
  justify-content: center;
  gap: 15px;
  padding: 0 15px;
  @media screen and (min-width: 641px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-template-rows: 200px;
    padding: 0 80px;
  }
`;
const FlexFooter = styled.div`
  width: 100%;
  display: Flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding-bottom: ;
`;

// tercera solucion
export default function CategoriesPage() {
  const router = useRouter();
  const { query } = router;
  const queryCategory = query.category;
  const queryPage = parseInt(query.page) || 1;

  const [category, setCategory] = useState(queryCategory || "");
  const [pages, setPages] = useState(queryPage);
  const [pageCat, setPageCat] = useState(queryPage);
  const [nameCategory, setNameCategory] = useState("");

  const pageSize = 20;

  const apiUrlCategories = `/api/categories/pagination?limit=${pageSize}&page=${pageCat}`;

  const {
    data: categories,
    isLoading: isLoadingCategory,
    mutate: mutateCategories,
  } = useSWR(apiUrlCategories, fetcher);

  const {
    products,
    isLoadingProduct,
    isErrorProducts,
    isValidating,
    totalProducts,
    mutateProducts,
  } = useProductsFilterForCategory(category, pages, pageSize);

  useEffect(() => {
    const resultadoFiltrado = categories?.categories?.find(
      (cat) => cat._id === queryCategory
    );
    setNameCategory(resultadoFiltrado?.name);
    setPages(queryPage);
    setCategory(queryCategory);
  }, [categories, queryCategory, queryPage]);

  const handlePageChange = (newPage, setPage, mutate) => {
    setPage(newPage);
    filterSearch({ router, page: newPage });
    mutate();
  };

  const handlePageChangePro = (pagNum) => {
    setPages(pagNum);
    filterSearch({ router, category: category, page: pagNum });
  };

  const handleGoBack = (currentPage, setPage, mutate) => {
    if (query.page > 1) {
      const newPage = parseInt(currentPage - 1);
      setPage(newPage);
      filterSearch({ router, page: newPage });
      mutate();
    }
    router.back();
  };

  const renderCategorySection = () => {
    const hasNextPage = categories && categories.result === 20;
    if (isLoadingCategory) {
      return <SkeletorCategories />;
    } else {
      return (
        <>
          <ListCategory>
            {categories?.categories?.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </ListCategory>
          <ButtonContainer>
            <ButtonDisabled
              $black
              onClick={() =>
                handlePageChange(pageCat - 1, setPageCat, mutateCategories)
              }
              disabled={pageCat <= 1}
            >
              Anterior
            </ButtonDisabled>
            <ButtonDisabled
              $white
              onClick={() =>
                handlePageChange(pageCat + 1, setPageCat, mutateCategories)
              }
              disabled={!hasNextPage}
            >
              Siguiente
            </ButtonDisabled>
          </ButtonContainer>
        </>
      );
    }
  };

  const renderFooter = () => {
    const totalPagesCategory = categories
      ? Math.ceil(categories.totalCategories / 20)
      : 1;
    const totalPagesProducts = products ? Math.ceil(totalProducts / 20) : 1;
    return (
      <FlexFooter>
        <Text>Página</Text>
        <Text $big>{category ? pages : pageCat}</Text>
        <Text>de</Text>
        <Text $big>{category ? totalPagesProducts : totalPagesCategory},</Text>
        <Text>Total de {category ? "producto/s" : "categorías"}:</Text>
        <Text $big>
          {category ? totalProducts : categories?.totalCategories}
        </Text>
      </FlexFooter>
    );
  };

  return (
    <Layout
      title="B.R.D | Categoria"
      description="Repuestos Originales en diferentes marcas que hacen la diferencia"
    >
      <ContentSection>
        <Title>Categorías</Title>
        {queryCategory ? (
          <>
            <Sorted>
              <BackButton
                onClick={() => handleGoBack(pages, setPages, mutateProducts)}
              />
              <BreadCrumb>
                <Text>Categoría</Text>
                <Divider> / </Divider>
                <Text $big>
                  {isLoadingProduct ? <Loader /> : nameCategory?.toUpperCase()}
                </Text>
              </BreadCrumb>
            </Sorted>
            <Wrapper>
              <ProductSearchForCategory
                products={products}
                isLoading={isLoadingProduct}
                totalProducts={totalProducts}
                isValidating={isValidating}
                isError={isErrorProducts}
                nameCategory={nameCategory}
              />
            </Wrapper>
            <Pagination
              currentPage={pages}
              onPageChange={handlePageChangePro}
              totalPages={Math.ceil(totalProducts / pageSize)}
              isLoading={isLoadingProduct || isValidating}
            />
          </>
        ) : (
          <>
            <Sorted>
              <BackButton
                onClick={() =>
                  handleGoBack(pageCat, setPageCat, mutateCategories)
                }
              />
              <BreadCrumb>
                <Text>Total,</Text>
                <Text $big>
                  {isLoadingCategory ? <Loader /> : categories?.totalCategories}
                </Text>
                <Text>Categorías.</Text>
              </BreadCrumb>
            </Sorted>
            <Wrapper>{renderCategorySection()}</Wrapper>
          </>
        )}
        {renderFooter()}
      </ContentSection>
    </Layout>
  );
}

// segunda
/* export default function CategoriesPage() {
  const router = useRouter();
  const { query } = router;
  const queryCategory = query.category;
  const [pages, setPages] = useState(1);
  const [pageCat, setPageCat] = useState(1);
  const [nameCategory, setNameCategory] = useState("");

  const apiUrlProducts = `/api/search?limit=20&page=${pages}&category=${query.category}`;
  const apiUrlCategories = `/api/categories/pag?limit=20&page=${pageCat}`;

  const {
    data: categories,
    isLoading: isLoadingCategory,
    mutate: mutateCategories,
  } = useSWR(apiUrlCategories, fetcher);

  const {
    data: products,
    isLoading: isLoadingProduct,
    mutate: mutateProducts,
  } = useSWR(apiUrlProducts, fetcher);

  const resultadoFiltrado = categories?.categories?.find(
    (cat) => cat._id === queryCategory
  );

  useEffect(() => {
    if ("page" in query) {
      const page = parseInt(query.page, 10);
      setPages(page);
      setPageCat(page);
      filterSearch({ router, page });
      mutateCategories();
    }

    if (resultadoFiltrado) {
      setNameCategory(resultadoFiltrado.name);
      mutateProducts();
    }
  }, [
    "category" in query,
    "page" in query,
    resultadoFiltrado,
    mutateCategories,
    mutateProducts,
  ]);

  const handlePageChange = (newPage, setPage, mutate) => {
    setPage(newPage);
    filterSearch({ router, page: newPage });
    mutate();
  };

  const handleGoBack = (currentPage, setPage, mutate) => {
    if (query.page > 1) {
      const newPage = parseInt(currentPage - 1);
      setPage(newPage);
      filterSearch({ router, page: newPage });
      mutate();
    }
    router.back();
  };

  const renderProductSection = () => {
    const hasNextPage = products && products?.result === 20;

    if (isLoadingProduct) {
      return <SkeletorProducts />;
    } else if (products?.result === 0) {
      return (
        <TitleH4>
          Aun no se ha registrado productos en:
          <Text $big>
            {" "}
            &ldquo;{nameCategory?.toUpperCase()}
            &rdquo;
          </Text>
        </TitleH4>
      );
    } else {
      return (
        <>
          <ProductsGrid products={products?.products} />
          <ButtonContainer>
            <ButtonDisabled
              $black
              onClick={() =>
                handlePageChange(pages - 1, setPages, mutateProducts)
              }
              disabled={pages <= 1}
            >
              Anterior
            </ButtonDisabled>
            <ButtonDisabled
              $white
              onClick={() =>
                handlePageChange(pages + 1, setPages, mutateProducts)
              }
              disabled={!hasNextPage}
            >
              Siguiente
            </ButtonDisabled>
          </ButtonContainer>
          <FlexFooter>
            <TextFooter>
              Página <TextFooter $big>{pages}</TextFooter>
            </TextFooter>
          </FlexFooter>
        </>
      );
    }
  };

  const renderCategorySection = () => {
    const hasNextPage = categories && categories.result === 20;
    if (isLoadingCategory) {
      return <SkeletorCategories />;
    } else {
      return (
        <>
          <ListCategory>
            {categories?.categories?.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </ListCategory>
          <ButtonContainer>
            <ButtonDisabled
              $black
              onClick={() =>
                handlePageChange(pageCat - 1, setPageCat, mutateCategories)
              }
              disabled={pageCat <= 1}
            >
              Anterior
            </ButtonDisabled>
            <ButtonDisabled
              $white
              onClick={() =>
                handlePageChange(pageCat + 1, setPageCat, mutateCategories)
              }
              disabled={!hasNextPage}
            >
              Siguiente
            </ButtonDisabled>
          </ButtonContainer>
        </>
      );
    }
  };

  const renderFooter = () => {
    const totalPagesCategory = categories
      ? Math.ceil(categories.totalCategories / 20)
      : 1;
    return (
      <FlexFooter>
        <TextFooter>
          Página <TextFooter $big>{pageCat}</TextFooter> de{" "}
          <TextFooter $big>{totalPagesCategory}</TextFooter>, Total de
          categorías:{" "}
          <TextFooter $big>{categories?.totalCategories}</TextFooter>
        </TextFooter>
      </FlexFooter>
    );
  };

  return (
    <Layout
      title="B.R.D | Categoria"
      description="Repuestos Originales en diferentes marcas que hacen la diferencia"
    >
      <ContentSection>
        <Title>Categorías</Title>
        {queryCategory ? (
          <>
            <Sorted>
              <BackButton
                onClick={() => handleGoBack(pages, setPages, mutateProducts)}
              />
              <BreadCrumb>
                <Text>Categoría</Text>
                <Divider> / </Divider>
                <Text $big>
                  {isLoadingProduct ? <Loader /> : nameCategory?.toUpperCase()}
                </Text>
              </BreadCrumb>
            </Sorted>
            <Wrapper>{renderProductSection()}</Wrapper>
          </>
        ) : (
          <>
            <Sorted>
              <BackButton
                onClick={() =>
                  handleGoBack(pageCat, setPageCat, mutateCategories)
                }
              />
              <BreadCrumb>
                <Text>Total,</Text>
                <Text $big>
                  {isLoadingCategory ? <Loader /> : categories?.totalCategories}
                </Text>
                <Text>Categorías.</Text>
              </BreadCrumb>
            </Sorted>
            <Wrapper>{renderCategorySection()}</Wrapper>
            {renderFooter()}
          </>
        )}
      </ContentSection>
    </Layout>
  );
} */

// primera
/* export default function CategoriesPage() {
  const router = useRouter();
  const query = router.query;
  const queryCategory = query.category;
  const [pages, setPages] = useState(1);
  const [pageCat, setPageCat] = useState(1);
  const [nameCategory, setNameCategory] = useState("");

  const apiUrlProducts = `/api/search?limit=20&page=${pages}&category=${query.category}`;
  const apiUrlCategories = `/api/categories/pag?limit=20&page=${pageCat}`;

  const {
    data: categories,
    isLoading: isLoadingCategory,
    mutate: mutateCategories,
  } = useSWR(apiUrlCategories, fetcher);
  const {
    data: products,
    isLoading: isLoadingProduct,
    mutate: mutateProducts,
  } = useSWR(apiUrlProducts, fetcher);

  const resultadoFiltrado = categories?.categories?.find(
    (cat) => cat._id === getCategory
  );

  useEffect(() => {
    if ("page" in query) {
      const page = parseInt(query.page, 10);
      setPages(page);
      setPageCat(page);
      filterSearch({ router, page });
      mutateCategories();
    }
  }, ["page" in query, mutateCategories]);

  useEffect(() => {
    if (resultadoFiltrado) {
      setNameCategory(resultadoFiltrado.name);
    }
  }, [resultadoFiltrado, "category" in query]);
    }, ["page" in query, mutateCategories]);

  const handlePageChange = (newPage, setPage, mutate) => {
    setPage(newPage);
    filterSearch({ router, page: newPage });
    mutate();
  };

  const handleGoBack = (currentPage, setPage, mutate) => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      if (newPage >= 1) {
        setPage(newPage);
        filterSearch({ router, page: newPage });
        mutate();
      }
    }
    router.back();
  };

  const totalPagesCategory = categories
    ? Math.ceil(categories?.totalCategories / 20)
    : 1;

  const hasNextPageCategory = categories && categories?.result === 20;
  const hasNextPageProduct = products && products?.result === 20;

  return (
    <Layout
      title="B.R.D | Categoria"
      description="Repuestos Originales en diferentes marcas que hacen la diferencia"
    >
      <ContentSection>
        <Title>Categorias</Title>
        {getCategory ? (
          <>
            <FlexStyled aria-label="breadcrumb">
              <Sorted>
                <BackButton
                  onClick={() => handleGoBack(pages, setPages, mutateProducts)}
                />
                <BreadCrumb>
                  <Text>Categoría</Text>
                  <BreadCrumb aria-current="page">
                    <Divider> / </Divider>
                    <Text $big={1}>{nameCategory?.toUpperCase()}</Text>
                  </BreadCrumb>
                </BreadCrumb>
              </Sorted>
            </FlexStyled>
            <Wrapper>
              {isLoadingProduct ? (
                <SkeletorProducts />
              ) : products?.result === 0 ? (
                <TitleH4>
                  No se encontró productos en &ldquo;
                  {nameCategory?.toUpperCase()}
                  &rdquo;
                </TitleH4>
              ) : (
                <>
                  <ProductsGrid products={products?.products} />
                  <ButtonContainer>
                    <ButtonDisabled
                      $black
                      onClick={() =>
                        handlePageChange(pages - 1, setPages, mutateProducts)
                      }
                      disabled={pages <= 1}
                    >
                      Anterior
                    </ButtonDisabled>
                    <ButtonDisabled
                      $white
                      onClick={() =>
                        handlePageChange(pages + 1, setPages, mutateProducts)
                      }
                      disabled={!hasNextPageProduct}
                    >
                      Siguiente
                    </ButtonDisabled>
                  </ButtonContainer>
                  <FlexFooter>
                    <TextFooter>
                      Pagina <TextFooter $big={1}>{pages}</TextFooter>
                    </TextFooter>
                  </FlexFooter>
                </>
              )}
            </Wrapper>
          </>
        ) : (
          <>
            <FlexStyled>
              <BackButton
                onClick={() =>
                  handleGoBack(pageCat, setPageCat, mutateCategories)
                }
              />
              <FlexStyled>
                <Text>Total,</Text>
                <Text $big={1}>
                  {isLoadingCategory ? <Loader /> : categories?.totalCategories}
                </Text>
                <Text>Categorías.</Text>
              </FlexStyled>
            </FlexStyled>

            <Wrapper>
              {isLoadingCategory ? (
                <SkeletorCategories />
              ) : (
                <ListCategory>
                  {categories?.categories?.map((item) => (
                    <ItemCard key={item._id} item={item} />
                  ))}
                </ListCategory>
              )}
              <ButtonContainer>
                <ButtonDisabled
                  $black
                  onClick={() =>
                    handlePageChange(pageCat - 1, setPageCat, mutateCategories)
                  }
                  disabled={pageCat <= 1}
                >
                  Anterior
                </ButtonDisabled>
                <ButtonDisabled
                  $white
                  onClick={() =>
                    handlePageChange(pageCat + 1, setPageCat, mutateCategories)
                  }
                  disabled={!hasNextPageCategory}
                >
                  Siguiente
                </ButtonDisabled>
              </ButtonContainer>

              <FlexFooter>
                <TextFooter>
                  Página <TextFooter $big={1}>{pageCat}</TextFooter> de{" "}
                  <TextFooter $big={1}>{totalPagesCategory}</TextFooter>, Total
                  de categorías:{" "}
                  <TextFooter $big={1}>
                    {categories?.totalCategories}
                  </TextFooter>
                </TextFooter>
              </FlexFooter>
            </Wrapper>
          </>
        )}
      </ContentSection>
    </Layout>
  );
}
 */
