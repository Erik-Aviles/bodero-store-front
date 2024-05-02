import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import filterSearch from "@/utils/filterSearch";
import Title from "@/components/stylesComponents/Title";
import styled from "styled-components";
import Layout from "@/components/Layout";
import { brands } from "@/resource/data";
import { ButtonContainer } from "@/components/buttonComponents/ButtonContainer";
import { CenterSecction } from "@/components/stylesComponents/CenterSecction";
import { TitleH4 } from "@/components/stylesComponents/TitleH4";
import BackButton from "@/components/buttonComponents/BackButton";
import { FlexStyled } from "@/components/stylesComponents/Flex";
import ProductsGrid from "@/components/ProductsGrid";
import ButtonDisabled from "@/components/buttonComponents/ButtonDisabled";
import SkeletorProducts from "@/components/skeletor/SkeletorProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

const CenterDiv = styled.section`
  ${CenterSecction}
`;

export default function ProductsPage({ products }) {
  const router = useRouter();
  const [product, setProducts] = useState(products);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    setProducts(products);
  }, [products]);

  const handlePageChange = (newPage) => {
    setPages(newPage);
    filterSearch({ router, page: newPage });
  };

  const hasNextPage = products?.length === 20;

  const handleGoBack = (e) => {
    e.preventDefault();
    if (router.query.page > 1) {
      setPages(pages - 1);
      filterSearch({ router, page: pages - 1 });
    } else {
      router.push("/");
    }
  };

  const brandNames = brands.map((brand) => brand.name);
  const brandNamesString = brandNames.join(", ");

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
        {!product ? (
          <SkeletorProducts />
        ) : product?.length === 0 ? (
          <TitleH4>Productos no registrado</TitleH4>
        ) : (
          <ProductsGrid products={product} />
        )}
        {product.length >= 20 && (
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
export async function getServerSideProps(context) {
  await mongooseConnect();

  const { page = 1, limit = 20 } = context.query;
  const skip = (page - 1) * limit;

  try {
    const products = await Product.find({}, null, { sort: { _id: -1 } })
      .skip(skip)
      .limit(limit)
      .select(
        "title salePrice brand code codeWeb codeEnterprise images compatibility quantity"
      );

    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
      },
    };
  } catch (err) {
    return {
      props: {
        error: err.message,
      },
    };
  }
}

/* function buildUrl(baseUrl, query) {
  const url = new URL(baseUrl);

  const page = query.page || 1;
  const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search;

  url.searchParams.set("page", page);
  url.searchParams.set("category", category);
  url.searchParams.set("sort", sort);

  if (search !== undefined) {
    url.searchParams.set("title", search);
  }

  return url.toString();
}
export async function getServerSideProps(context) {
  const { query } = context;
  const apiUrl = `${process.env.PUBLIC_URL}/api/products`;
  const finalUrl = buildUrl(apiUrl, query);

  try {
    const response = await fetch(finalUrl, {
      headers: {
        "Content-Type": "application/json", // Ejemplo de otro encabezado
      },
    });

    if (!response.ok) {
      throw new Error("La respuesta de la red no fue correcta");
    }

    const data = await response.json();
    return {
      props: {
        products: data.products,
        result: data.result,
      },
    };
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return {
      props: {
        error: "Error al obtener los datos ",
      },
    };
  }
} */
