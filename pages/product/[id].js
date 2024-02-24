import { error, grey, greylight, primary, success } from "@/lib/colors";
import ProductImages from "@/components/ProductImages";
import { mongooseConnect } from "@/lib/mongoose";
import WhiteBox from "@/components/WhiteBox";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import styled from "styled-components";
import Head from "next/head";
import CategoriesComponent from "@/components/CategoriesComponent";
import { CenterSecction } from "@/components/stylesComponents/CenterSecction";

const CenterDiv = styled.section`
  ${CenterSecction}
`;

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
  font-size: 1.8rem;
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
  @media screen and (max-width: 480px) {
    padding: 0 1.4rem;
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
  return (
    <>
      <Head>
        <title>B.D.R | {product.title}</title>
      </Head>
      <main>
        <CategoriesComponent categories={categories} />
        <CenterDiv>
          <ColWrapper>
            <WhiteBox>
              <ProductImages images={product.images} />
            </WhiteBox>
            <Row>
              <InfoTitle>
                <Title>{product.title.toUpperCase()}</Title>
                <span>
                  <strong>Código:</strong>
                  {product.code}
                </span>
              </InfoTitle>
              <p>{product.description}</p>
              <Info>
                <span style={{ color: success, fontSize: 20 }}>
                  Precio Venta:
                </span>
                <Price>${product.salePrice}</Price>
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
        </CenterDiv>
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
