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
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.2);
  }
  img {
    max-width: 100%;
    max-height: 100px;
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
  margin-top: 15px;
`;
const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;
const Price = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

export default function ProductBox({ _id, name, description, price, images }) {
  const { addProduct } = useContext(CartContext);
  const url = "/product/" + _id;
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images?.[0]} alt={name} title={`Ver ${name}`} />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{name}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button primary={1} outline={1} onClick={() => addProduct(_id)}>
            Agregar
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
