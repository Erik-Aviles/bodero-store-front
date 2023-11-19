import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import { CardIcon } from "@/components/Icons";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import Head from "next/head";
import { useContext } from "react";
import styled from "styled-components";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
  margin-top: 40px;
`;

const PriceRow = styled.div`
  display: flex;
  aling-items: center;
  gap: 20px;
`;

const Price = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
`;

export default function ProductPage({ product, categories }) {
  const { addProduct } = useContext(CartContext);
  return (
    <>
      <Head>
        <title>B.D.R | {product.name}</title>
      </Head>
      <main>
        <Header categories={categories} />
        <Center>
          <ColWrapper>
            <WhiteBox>
              <ProductImages images={product.images} />
            </WhiteBox>
            <div>
              <Title>{product.name}</Title>
              <p>{product.description}</p>
              <PriceRow>
                <div>
                  <Price>${product.price}</Price>
                </div>
                <div>
                  <Button onClick={() => addProduct(product._id)} primary>
                    <CardIcon /> Comprar
                  </Button>
                </div>
              </PriceRow>
            </div>
          </ColWrapper>
        </Center>
      </main>
    </>
  );
}
export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  const categories = await Category.find({}, null, { sort: { _id: -1 } });

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
