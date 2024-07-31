import SkeletorProducts from "./skeletor/SkeletorProducts";
import React, { Suspense } from "react";

const ProductsGrid = React.lazy(() => import("@/components/ProductsGrid"));

const ProductSearch = ({ products, isLoading }) => {
  if (isLoading) return <SkeletorProducts />;

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ProductsGrid products={products} />
    </Suspense>
  );
};

export default ProductSearch;
