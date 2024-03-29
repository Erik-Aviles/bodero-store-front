import styled from "styled-components";
import { ProductBox } from "./ProductBox";

const StyledProductsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px 0;
`;

export function ProductsGrid({ products }) {
  return (
    <StyledProductsGrid>
      {products?.length > 0 &&
        products.map((product) => (
          <ProductBox key={product._id} {...product} />
        ))}
    </StyledProductsGrid>
  );
}
