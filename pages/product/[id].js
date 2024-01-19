import { error, grey, greylight, primary, success } from "@/lib/colors";
import Categories from "@/components/FilterOnlyCategories";
import ProductImages from "@/components/ProductImages";
import { CartContext } from "@/components/CartContext";
import { mongooseConnect } from "@/lib/mongoose";
import WhiteBox from "@/components/WhiteBox";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import Center from "@/components/Center";
import styled from "styled-components";
import { useContext } from "react";
import Head from "next/head";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 5px;
  color: ${primary};
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  aling-items: center;
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
  span {
    color: ${grey};
    font-size: 12px;
    strong {
      margin-right: 5px;
    }
  }
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
                <Title>{product.title.toUpperCase()}</Title>
                <span>
                  <strong>Ref:</strong>
                  {product.code}
                </span>
              </InfoTitle>
              <p>{product.description}</p>
              <Info>
                <span style={{ color: success, fontSize: 20 }}>
                  Precio venta:
                </span>
                <Price>${product.priceVen}</Price>
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
