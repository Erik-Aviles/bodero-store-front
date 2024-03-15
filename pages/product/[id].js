import { useRouter } from "next/navigation";
import { mongooseConnect } from "@/lib/mongoose";
import { grey, greylight, primary, success } from "@/lib/colors";
import ProductImages from "@/components/ProductImages";
import WhiteBox from "@/components/WhiteBox";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import styled from "styled-components";
import CategoriesComponent from "@/components/CategoriesComponent";
import CompatibilityModal from "@/components/CompatibilityModal";
import BackButton from "@/components/buttonComponents/BackButton";
import { CenterSecction } from "@/components/stylesComponents/CenterSecction";
import Layout from "@/components/Layout";

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

  @media screen and (max-width: 480px) {
    padding: 0 1.4rem;
  }
`;

const InfoText = styled.p`
  margin: 0;
  padding: 0.8rem 0;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: ${greylight};
  color: ${grey};
  line-height: 1.4rem;
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
  const router = useRouter();

  const handleGoBack = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <Layout title={`B.R.D | ${product?.title?.toUpperCase()}`}>
      <CategoriesComponent categories={categories} />
      <CenterDiv>
        <BackButton onClick={handleGoBack} />
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product?.images} name={product?.title} />
          </WhiteBox>
          <Row>
            <InfoTitle>
              <Title>{product?.title.toUpperCase()}</Title>
              <span>
                <strong>Código:</strong>
                {product?.code}
              </span>
            </InfoTitle>
            <InfoText>{product?.description}</InfoText>
            <Info>
              <span style={{ color: success, fontSize: 20 }}>
                Precio Venta:
              </span>
              <Price>${product.salePrice}</Price>
            </Info>
            <Info>
              <span style={{ color: grey, fontSize: 16 }}>Disponibilidad:</span>
              <span>
                <strong>{product?.quantity}</strong>
              </span>
            </Info>
            <CompatibilityModal product={product} />
          </Row>
        </ColWrapper>
      </CenterDiv>
    </Layout>
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
