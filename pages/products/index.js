import { useRouter } from "next/router";
import Title from "@/components/stylesComponents/Title";
import styled, { css } from "styled-components";
import Layout from "@/components/Layout";
import { ButtonContainer } from "@/components/buttonComponents/ButtonContainer";
import BackButton from "@/components/buttonComponents/BackButton";
import { FlexStyled } from "@/components/stylesComponents/Flex";
import ProductsGrid from "@/components/ProductsGrid";
import ButtonDisabled from "@/components/buttonComponents/ButtonDisabled";
import SkeletorProducts from "@/components/skeletor/SkeletorProducts";
import { brands } from "@/resource/brandsData";
import { grey, secondary } from "@/lib/colors";
import useProducts from "@/hooks/useProducts";
import { useEffect } from "react";
import filterSearch from "@/utils/filterSearch";

const CenterDiv = styled.section`
  height: auto;
  margin: 0 auto;
  background: #f7f7f7;
  @media screen and (min-width: 640px) {
    padding: 20px 40px;
  }
`;
const FlexFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const TextFooter = styled.span`
  color: ${grey};
  font-size: 0.8rem;
  padding: 0 10px;
  @media screen and (min-width: 641px) {
    padding: 0;
    font-size: 1rem;
  }
  ${(props) =>
    props.$big &&
    css`
      color: ${secondary};
      font-weight: 500;
    `};
`;

export default function ProductsPage() {
  const {
    data,
    error,
    isLoading,
    isValidating,
    pages,
    setPages,
    mutate,
    handleGoBack,
    handlePageChange,
  } = useProducts();
  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    if ("page" in query) {
      const newPage = parseInt(query.page, 10);
      setPages(newPage);
      filterSearch({ router, page: query.page });
      mutate();
    }
  }, ["page" in query]);

  const totalPages = data ? Math.ceil(data?.totalProducts / 20) : 1;

  const hasNextPage = data && data?.result === 20;

  const brandNames = brands.map((brand) => brand.name);
  const brandNamesString = brandNames.join(", ");

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Layout
      title="B.R.D | Todos los Productos"
      description={`Marcas reconocidas como: ${brandNamesString}`}
    >
      <CenterDiv>
        <FlexStyled>
          <BackButton onClick={handleGoBack} />
          <Title>Todos los productos</Title>
        </FlexStyled>
        {isLoading ? (
          <SkeletorProducts />
        ) : (
          <>
            <ProductsGrid products={data?.products} />
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
            <FlexFooter>
              <TextFooter>
                Pagina <TextFooter $big={1}>{pages}</TextFooter> de{" "}
                <TextFooter $big={1}>{totalPages}, </TextFooter>
                Total de productos:
                <TextFooter $big={1}> {data?.totalProducts}</TextFooter>
              </TextFooter>
            </FlexFooter>
          </>
        )}
      </CenterDiv>
    </Layout>
  );
}
