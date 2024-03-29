import { primary, white2 } from "@/lib/colors";
import React from "react";
import { RiseLoader } from "react-spinners";
import styled from "styled-components";

const SkeletorProductsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px 0;
  div {
    height: 480px;
    width: 18rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
    background-color: ${white2};
    padding: 0.8rem;
    margin: 8px auto;
  }
`;

const SkeletorProducts = () => {
  return (
    <SkeletorProductsGrid>
      <div>
        <RiseLoader color={primary} speedMultiplier={1} size={7} />
      </div>
      <div>
        <RiseLoader color={primary} speedMultiplier={1} size={7} />
      </div>
      <div>
        <RiseLoader color={primary} speedMultiplier={1} size={7} />
      </div>
    </SkeletorProductsGrid>
  );
};

export default SkeletorProducts;
