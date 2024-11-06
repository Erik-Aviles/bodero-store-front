import { ButtonContainer } from "@/components/buttonComponents/ButtonContainer";
import { useData } from "@/hooks/useData";
import ButtonDisabled from "@/components/buttonComponents/ButtonDisabled";
import SkeletorProducts from "@/components/skeletor/SkeletorProducts";
import BackButton from "@/components/buttonComponents/BackButton";
import Text from "@/components/stylesComponents/HighlightedText";
import { FlexStyled } from "@/components/stylesComponents/Flex";
import Title from "@/components/stylesComponents/Title";
import ProductsGrid from "@/components/ProductsGrid";
import filterSearch from "@/utils/filterSearch";
import styled, { css } from "styled-components";
import { grey, secondary } from "@/lib/colors";
import useProducts from "@/hooks/useProducts";
import { Loader } from "@/components/Loader";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

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
  display: Flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding-bottom: ;
`;

export default function ProductsPage() {
  const { company } = useData();
  const brands = company?.brands;

  const router = useRouter();
  const { query } = router;
  const [limit] = useState(20);
  const {
    data,
    error,
    isLoading,
    pages,
    setPages,
    handleGoBack,
    handlePageChange,
  } = useProducts(limit);

  useEffect(() => {
    if (query.page) {
      const newPage = parseInt(query.page, 10);
      setPages(newPage);
      filterSearch({ router, page: newPage });
    }
  }, [query.page]);

  const totalPages = data ? Math.ceil(data?.totalProducts / limit) : 1;

  const hasNextPage = data && data?.result === 20;

  const brandNames = brands?.map((brand) => brand.name);
  const brandNamesString = brandNames?.join(", ");

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
              <Text>Pagina</Text>
              <Text $big={1}>{isLoading ? <Loader /> : pages}</Text>
              <Text>de</Text>
              <Text $big={1}>{isLoading ? <Loader /> : totalPages},</Text>
              <Text>Total de productos:</Text>
              <Text $big={1}>
                {isLoading ? <Loader /> : data?.totalProducts}
              </Text>
            </FlexFooter>
          </>
        )}
      </CenterDiv>
    </Layout>
  );
}
