import Categories from "@/components/Categories";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { DataContext } from "@/context/DataContext";
import { getData } from "@/utils/FetchData";
import filterSearch from "@/utils/filterSearch";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function CategoriesPage({ products, result }) {
  const { data } = useContext(DataContext);
  const { categories } = data;

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
        <title>B.R.D | Categoria </title>
        <meta
          name="description"
          content="Repuestos Originales  en diferentes marcas que hacen la diferencia"
        />
      </Head>
      <main>
        <Categories categories={categories} />
        <Center>
          {product?.length === 0 ? (
            <h2>No Products</h2>
          ) : (
            <>
              <Title>Producto por categoria</Title>
              <ProductsGrid products={product} />
            </>
          )}
        </Center>
        {result < page * 6 ? (
          ""
        ) : (
          <button onClick={handleLoadmore}>Load more</button>
        )}
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
