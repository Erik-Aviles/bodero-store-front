import styled from "styled-components";
import Button from "./Button";
import { CardIcon } from "./Icons";
import Link from "next/link";
import { CartContext } from "./CartContext";
import { useContext } from "react";
import { white } from "@/lib/colors";

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: ${white};
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
  color: inherit;
  text-decoration: none;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;
const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;
const Price = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
`;

export default function ProductBox({ _id, name, description, price, images }) {
  const { addProduct } = useContext(CartContext);
  const url = "/productc/" + _id;
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images?.[0]} alt={name} />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{name}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button onClick={() => addProduct(_id)} primary outline>
            Comprar
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
