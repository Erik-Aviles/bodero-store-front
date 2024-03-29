import { useContext, useState } from "react";
import { DataContext } from "@/context/DataContext";
import filterSearch from "@/utils/filterSearch";
import Filter from "@/components/Filter";
import { useRouter } from "next/router";
import Title from "@/components/stylesComponents/Title";
import styled, { css } from "styled-components";
import Layout from "@/components/Layout";
import { brands } from "@/resource/data";
import { TitleH4 } from "@/components/stylesComponents/TitleH4";
import { FlexStyled } from "@/components/stylesComponents/Flex";
import BackButton from "@/components/buttonComponents/BackButton";
import { ButtonContainer } from "@/components/buttonComponents/ButtonContainer";
import useSWR from "swr";
import ButtonDisabled from "@/components/buttonComponents/ButtonDisabled";
import SkeletorProducts from "@/components/skeletor/SkeletorProducts";
import { ProductsGrid } from "@/components/ProductsGrid";

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
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function SearchPage() {
  const { categories } = useContext(DataContext);
  const router = useRouter();
  const query = router.query;
  const [pages, setPages] = useState(1);
  const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search || "";

  const { data, error } = useSWR(
    `/api/products?page=${pages}&category=${category}&sort=${sort}&title=${search}`,
    fetcher,
    {
      dedupingInterval: 2000,
    }
  );

  if (error) return <div>Error al cargar los datos</div>;

  const handlePageChange = (newPage) => {
    setPages(newPage);
    filterSearch({ router, page: newPage });
  };

  const hasNextPage = data?.products.length === 20;

  const brandNames = brands.map((brand) => brand.name);
  const brandNamesString = brandNames.join(", ");

  const handleGoBack = (e) => {
    e.preventDefault();
    if (router.query.page > 1) {
      setPages(pages - 1);
      filterSearch({ router, page: pages - 1 });
    }
    if (!router.query) {
      router.push("/");
    } else {
      router.back();
    }
  };

  return (
    <Layout
      title="B.R.D | Busqueda de productos"
      description={`Contammos con marcas reconocidas como: ${brandNamesString}`}
    >
      <CenterDiv>
        <Filter categories={categories} />
        <FlexStyled>
          <BackButton onClick={handleGoBack} />
          <Title>Busqueda de productos </Title>
        </FlexStyled>
        {!data ? (
          <SkeletorProducts />
        ) : data?.products.length === 0 ? (
          <TitleH4>Producto no registrado</TitleH4>
        ) : (
          <ProductsGrid products={data.products} />
        )}
        {data?.products.length >= 20 && (
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

/* export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search;

  const res = await getData(
    `products?limit=${
      page * 20
    }&category=${category}&sort=${sort}&title=${search}`
  );

  return {
    props: {
      products: res.products,
      result: res.result,
    },
  };
}
 */
