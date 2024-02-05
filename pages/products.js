import { useContext, useEffect, useState } from "react";
import ProductsGrid from "@/components/ProductsGrid";
import { DataContext } from "@/context/DataContext";
import filterSearch from "@/utils/filterSearch";
import { getData } from "@/utils/FetchData";
import Center from "@/components/Center";
import Filter from "@/components/Filter";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import Title from "@/components/Title";
import styled from "styled-components";
import Head from "next/head";
import { ButtonContainer } from "./categories";

export default function ProductsPage({ products, result }) {
  const { data } = useContext(DataContext);
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

  return (
    <>
      <Head>
        <title>B.R.D | Busqueda</title>
        <meta
          name="description"
          content="Repuestos Originales  en diferentes marcas que hacen la diferencia"
        />
      </Head>
      <main>
        <Filter data={data} />
        <Center>
          {product?.length === 0 ? (
            <h2>No Products</h2>
          ) : (
            <>
              <Title>Todos los productos</Title>
              <ProductsGrid products={product} />
            </>
          )}

          {result < page * 6 ? (
            ""
          ) : (
            <ButtonContainer>
              <Button black={1} outline={1} size="m" onClick={handleLoadmore}>
                Load more
              </Button>
            </ButtonContainer>
          )}
        </Center>
      </main>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search || "all";

  const res = await getData(
    `products?limit=${
      page * 6
    }&category=${category}&sort=${sort}&title=${search}`
  );

  return {
    props: {
      products: res.products,
      result: res.result,
    },
  };
}
