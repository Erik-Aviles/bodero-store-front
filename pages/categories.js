import { useEffect, useState } from "react";
import { CenterSecction } from "@/components/stylesComponents/CenterSecction";
import CategoriesComponent from "@/components/CategoriesComponent";
import ProductsGrid from "@/components/ProductsGrid";
import { mongooseConnect } from "@/lib/mongoose";
import styled, { css } from "styled-components";
import filterSearch from "@/utils/filterSearch";
import { grey, secondary } from "@/lib/colors";
import { Category } from "@/models/Category";
import { getData } from "@/utils/FetchData";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import Head from "next/head";

const CenterDiv = styled.section`
  ${CenterSecction}
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
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
  padding-top: 1rem;
`;

const Text = styled.span`
  color: ${grey};
  ${(props) =>
    props.txmain &&
    css`
      color: ${secondary};
      font-size: 1rem;
      font-weight: 500;
    `};
`;

const TextH4 = styled.h4`
  font-size: 1.4rem;
  color: ${grey};
  @media screen and (max-width: 640px) {
    padding-left: 1.2rem;
  }
`;
const Divider = styled.span`
  color: ${grey};
  padding-left: 0.3rem;
  padding-right: 0.3rem;
`;

export default function CategoriesPage({ categories, products, result }) {
  const [product, setProducts] = useState(products);
  const [page, setPage] = useState(1);

  const router = useRouter();
  useEffect(() => {
    setProducts(products);
  }, [products]);

  useEffect(() => {
    if (Object.keys(router.query).length === 0) setPage(1);
  }, [router.query]);

  const handleLoadmore = () => {
    setPage(page + 1);
    filterSearch({ router, page: page + 1 });
  };

  const resultadoFiltrado = categories.filter((objeto) =>
    objeto._id.includes(router.query.category)
  );

  return (
    <>
      <Head>
        <title>B.R.D | Categoria </title>
        <meta
          name="description"
          content="Repuestos Originales  en diferentes marcas que hacen la diferencia"
        />
      </Head>
      <main>
        <CategoriesComponent categories={categories} />
        <CenterDiv>
          <section aria-label="breadcrumb">
            <Sorted>
              <BreadCrumb>
                <Text>Categoría</Text>
              </BreadCrumb>
              <BreadCrumb aria-current="page">
                <Divider> / </Divider>
                <Text txmain={1}>
                  {resultadoFiltrado[0]?.name
                    ? resultadoFiltrado[0]?.name
                    : "Todas"}
                </Text>
              </BreadCrumb>
            </Sorted>
          </section>
          {product?.length === 0 ? (
            <TextH4>
              No se encontró productos en "{resultadoFiltrado[0]?.name}"
            </TextH4>
          ) : (
            <ProductsGrid products={product} />
          )}

          {result < page * 6 ? (
            ""
          ) : (
            <ButtonContainer>
              <Button $black={1} $outline={1} size="m" onClick={handleLoadmore}>
                Load more
              </Button>
            </ButtonContainer>
          )}
        </CenterDiv>
      </main>
    </>
  );
}

export async function getServerSideProps({ query }) {
  await mongooseConnect();

  const page = query.page || 1;
  const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search || "all";

  const categories = await Category.find({}, null, { sort: { _id: -1 } });
  const res = await getData(
    `products?limit=${
      page * 6
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
