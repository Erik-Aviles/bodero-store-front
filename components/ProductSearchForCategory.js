import SkeletorProducts from "./skeletor/SkeletorProducts";
import React, { Suspense } from "react";
import { TitleH4 } from "./stylesComponents/TitleH4";
import Text from "./stylesComponents/HighlightedText";

const ProductsGrid = React.lazy(() => import("@/components/ProductsGrid"));

const ProductSearchForCategory = ({
  products,
  nameCategory,
  totalProducts,
  isLoading,
  isError,
}) => {
  if (isLoading) return <SkeletorProducts />;
  if (isError) return <div>Se produjo un error al cargar los productos</div>;

  return (
    <>
      {totalProducts === 0 && (
        <TitleH4>
          Aun no se ha registrado productos en:
          <Text $big>
            {" "}
            &ldquo;{nameCategory?.toUpperCase()}
            &rdquo;
          </Text>
        </TitleH4>
      )}
      <Suspense fallback={<div>Cargando...</div>}>
        <ProductsGrid products={products} />
      </Suspense>
    </>
  );
};

export default ProductSearchForCategory;
