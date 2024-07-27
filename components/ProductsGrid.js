import { ProductBox } from "./ProductBox";
import styled from "styled-components";

const StyledProductsGrid = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;

const ProductsGrid = ({ products }) => {
  return (
    <StyledProductsGrid>
      {products?.length > 0 &&
        products.map((product) => (
          <ProductBox key={product._id} {...product} />
        ))}
    </StyledProductsGrid>
  );
};
export default ProductsGrid;
