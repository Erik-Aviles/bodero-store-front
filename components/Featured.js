import React, { useContext } from "react";
import Center from "./Center";
import styled from "styled-components";
import Button from "./Button";
import { CardIcon } from "./Icons";
import ButtonLink from "./ButtonLink";
import { CartContext } from "./CartContext";
import { black, grey } from "@/lib/colors";

const Bg = styled.div`
  color: #ffff;
  padding: 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
`;

const Description = styled.p`
  color: ${grey};
  font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  background-color: ${black};
  display: grid;
  padding: 30px;
  grid-template-columns: 1fr 0.9fr;
  gap: 40px;
  img {
    max-width: 100%;
  }
`;

const Columns = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

const Featured = ({ product }) => {
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
  }

  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Columns>
            <div>
              <Title>{product.name}</Title>
              <Description>{product.description}.</Description>
              <ButtonWrapper>
                <ButtonLink
                  href={"/product/" + product._id}
                  outline={1}
                  white={1}
                >
                  Leer mas
                </ButtonLink>
                <Button primary onClick={addFeaturedToCart}>
                  <CardIcon />
                  Comprar Aquí
                </Button>
              </ButtonWrapper>
            </div>
          </Columns>
          <Columns>
            <img src="https://bodero-ecommence-admin.s3.amazonaws.com/1693418506765.png" />
          </Columns>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
};

export default Featured;
