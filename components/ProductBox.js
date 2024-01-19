import styled, { css } from "styled-components";
import Button from "./Button";
import { CartContext } from "./CartContext";
import { useContext } from "react";
import { error, success, white, white2 } from "@/lib/colors";
import ButtonLink from "./ButtonLink";

const ProductWrapper = styled.div`
  width: 18rem;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: ${white};
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  margin: 10px auto;
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: scale(1);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
`;

const WhiteBox = styled.img`
  height: 250px;
  border-radius: 0.25rem 0.25rem 0 0;
  object-position: 50%;
  object-fit: contain;
  ${"" /* cambiar si es necesario con cover */}
`;

const ProductInfoBox = styled.div`
  padding: 1.25rem;

  p {
    font-size: 0.8rem;
    line-height: 1.2rem;
    height: 52px;
    overflow: hidden;
  }
`;

const Title = styled.h5`
  font-size: 1.25rem;
  margin-top: 0;
  margin-bottom: 0.75rem;
  overflow: hidden;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 5px 0;
  span {
    font-size: 0.8rem;
  }
`;
const Price = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

export default function ProductBox({
  _id,
  title,
  code,
  priceVen,
  priceDis,
  priceOff,
  brand,
  quantity,
  location,
  description,
  images,
}) {
  const { addProduct } = useContext(CartContext);
  const url = "/product/" + _id;
  return (
    <ProductWrapper>
      <WhiteBox src={images?.[0]} alt={title} title={title} />
      <ProductInfoBox>
        <Title href={url}>{title.toUpperCase()}</Title>
        <Row>
          <Price>${priceVen}</Price>
          {quantity === 5 ? (
            <span style={{ color: error }}>¡Agotado!</span>
          ) : (
            <span style={{ color: success }}>¡En stock!</span>
          )}
        </Row>
        <p>{description}</p>
        <Row>
          <ButtonLink href={"/product/" + _id} primary={1}>
            VER DETALLES
          </ButtonLink>
        </Row>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
