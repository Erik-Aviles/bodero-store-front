import styled, { css } from "styled-components";
import { useContext, useState } from "react";
import CategoriesComponent from "@/components/CategoriesComponent";
import useSWR from "swr";
import filterSearch from "@/utils/filterSearch";
import { grey, secondary } from "@/lib/colors";
import { useRouter } from "next/router";
import { CenterSecction } from "@/components/stylesComponents/CenterSecction";
import { ButtonContainer } from "@/components/buttonComponents/ButtonContainer";
import Layout from "@/components/Layout";
import { TitleH4 } from "@/components/stylesComponents/TitleH4";
import BackButton from "@/components/buttonComponents/BackButton";
import { FlexStyled } from "@/components/stylesComponents/Flex";
import { DataContext } from "@/context/DataContext";
import ButtonDisabled from "@/components/buttonComponents/ButtonDisabled";
import SkeletorProducts from "@/components/skeletor/SkeletorProducts";
import { ProductsGrid } from "@/components/ProductsGrid";

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
  text-transform: capitalize;
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
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function CategoriesPage() {
  const router = useRouter();
  const { categories } = useContext(DataContext);
  const [pages, setPages] = useState(1);
  const query = router.query;
  const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search || "all";

  const { data, error } = useSWR(
    `/api/products?page=${pages}&category=${category}&sort=${sort}&title=${search}`,
    fetcher,
    {
      dedupingInterval: 2000,
    }
  );

  const handlePageChange = (newPage) => {
    setPages(newPage);
    filterSearch({ router, page: newPage });
  };

  if (error) return <div>Error al cargar los datos</div>;

  const handleGoBack = (e) => {
    e.preventDefault();
    router.back();
  };

  const hasNextPage = data?.products.length === 20;

  const resultadoFiltrado = categories.filter((objeto) =>
    objeto._id.includes(router.query.category)
  );
  const nameCategory = resultadoFiltrado[0]?.name;
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
              <Text $big={1}>{nameCategory ? nameCategory : "Todas"}</Text>
            </BreadCrumb>
          </Sorted>
        </FlexStyled>
        {!data ? (
          <SkeletorProducts />
        ) : data?.products.length === 0 ? (
          <TitleH4>
            No se encontró productos en &ldquo;{nameCategory}&rdquo;
          </TitleH4>
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
  await mongooseConnect();

  const page = query.page || 1;
  const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search || "all";

  const categories = await Category.find({}, null, { sort: { _id: -1 } });

  const res = await getData(
    `products?limit=${
      page * 10
    }&category=${category}&sort=${sort}&title=${search}`
  );

  return {
    props: {
      products: res.products,
      result: res.result,
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
 */
