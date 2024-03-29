import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { DataContext } from "@/context/DataContext";
import filterSearch from "@/utils/filterSearch";
import useSWR from "swr";
import Title from "@/components/stylesComponents/Title";
import styled from "styled-components";
import Layout from "@/components/Layout";
import { brands } from "@/resource/data";
import CategoriesComponent from "@/components/CategoriesComponent";
import { ButtonContainer } from "@/components/buttonComponents/ButtonContainer";
import { CenterSecction } from "@/components/stylesComponents/CenterSecction";
import BackButton from "@/components/buttonComponents/BackButton";
import { FlexStyled } from "@/components/stylesComponents/Flex";
import ButtonDisabled from "@/components/buttonComponents/ButtonDisabled";
import SkeletorProducts from "@/components/skeletor/SkeletorProducts";
import { TitleH4 } from "@/components/stylesComponents/TitleH4";
import { ProductsGrid } from "@/components/ProductsGrid";

const CenterDiv = styled.section`
  ${CenterSecction}
`;

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ProductsPage() {
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
    } else {
      router.push("/");
    }
  };

  return (
    <Layout
      title="B.R.D | Todos los Productos"
      description={`Todo tipo de accesrios para las marcas como: ${brandNamesString}`}
    >
      <CategoriesComponent categories={categories} />
      <CenterDiv>
        <FlexStyled>
          <BackButton onClick={handleGoBack} />
          <Title>Todos los productos</Title>
        </FlexStyled>
        {!data ? (
          <SkeletorProducts />
        ) : data?.products.length === 0 ? (
          <TitleH4>Productos no registrado</TitleH4>
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
