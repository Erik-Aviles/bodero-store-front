import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Categories from "@/components/Categories";
import Center from "@/components/Center";
import Header from "@/components/Header";
import { CardIcon } from "@/components/Icons";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import { error, grey, greylight, primary, success } from "@/lib/colors";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import Head from "next/head";
import { useContext } from "react";
import styled from "styled-components";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  padding: 100px 0;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  aling-items: center;
  padding: ;
  p {
    margin: 0;
    padding: 0.8rem 0;
    border-top: 1px solid;
    border-bottom: 1px solid;
    border-color: ${greylight};
    color: ${grey};
    line-height: 1.4rem;
  }
`;

const InfoTitle = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 0.8rem;
`;
const Info = styled.div`
  display: flex;
  aling-items: center;
  padding: 0.8rem 0;
  gap: 10px;
  border-bottom: 1px solid;
  border-color: ${greylight};
  span {
    place-self: center;
  }
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
        <title>B.D.R | {product.title}</title>
      </Head>
      <main>
        <Categories categories={categories} />
        <Center>
          <ColWrapper>
            <WhiteBox>
              <ProductImages images={product.images} />
            </WhiteBox>
            <Row>
              <InfoTitle>
                <Title
                  style={{ color: primary, marginBottom: 5, marginTop: 0 }}
                >
                  {product.title}
                </Title>
                <span style={{ color: grey, fontSize: 12 }}>
                  <strong style={{ marginRight: 5 }}>Ref:</strong>
                  {product.code}
                </span>
              </InfoTitle>
              <p>{product.description}</p>
              <Info>
                <span style={{ color: success, fontSize: 20 }}>
                  Precio venta:
                </span>
                <Price>${product.price}</Price>
              </Info>
              <Info>
                <span style={{ color: grey, fontSize: 16 }}>
                  Disponibilidad:
                </span>
                <span>
                  <strong>{product.quantity}</strong>
                </span>
              </Info>
            </Row>
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
