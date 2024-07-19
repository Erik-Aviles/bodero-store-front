import SkeletorProducts from "./skeletor/SkeletorProducts";
import React, { Suspense } from "react";

const ProductsGrid = React.lazy(() => import("@/components/ProductsGrid"));

const ProductSearch = ({ products, isLoading, isError }) => {
  if (isLoading) return <SkeletorProducts />;
  if (isError) return <div>Se produjo un error al cargar los productos</div>;

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ProductsGrid products={products} />
    </Suspense>
  );
};

export default ProductSearch;
