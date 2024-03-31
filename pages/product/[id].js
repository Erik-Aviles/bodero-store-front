import styled from "styled-components";
import { useRouter } from "next/navigation";
import { mongooseConnect } from "@/lib/mongoose";
import {
  black,
  blacklight,
  error,
  grey,
  greylight,
  primary,
  success,
  white,
  white2,
} from "@/lib/colors";
import ProductImages from "@/components/ProductImages";
import { Product } from "@/models/Product";
import CategoriesComponent from "@/components/CategoriesComponent";
import CompatibilityModal from "@/components/CompatibilityModal";
import BackButton from "@/components/buttonComponents/BackButton";
import { CenterSecction } from "@/components/stylesComponents/CenterSecction";
import Layout from "@/components/Layout";
import { FlexStyled } from "@/components/stylesComponents/Flex";
import { useContext } from "react";
import { DataContext } from "@/context/DataContext";
import { CardIcon } from "@/components/Icons";
import Link from "next/link";

const CenterDiv = styled.section`
  ${CenterSecction}
`;

const ColWrapper = styled.div`
  font-size: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
`;
const Title = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 5px;
  color: ${primary};
  @media screen and (min-width: 640px) {
    font-size: 1.3rem;
  }
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
  line-height: 1rem;
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
  justify-content: space-between;
  padding: 0.8rem 0;
  gap: 10px;
  border-bottom: 1px solid;
  border-color: ${greylight};
  span {
    place-self: center;
  }
  div {
    display: flex;
    gap: 10px;
  }
  @media screen and (max-width: 780px) {
    flex-direction: column;
  }
`;

const Price = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;
const WrapperButton = styled.section`
  margin: 20px 0;
  display: flex;
  gap: 30px;
`;
const ButtonCard = styled.button`
  border: 1px solid ${black};
  background-color: ${black};
  color: ${white};
  border-radius: 0.275rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    border-color: ${success};
    background-color: ${success};
    color: ${white2};
  }
  &:focus {
    background-color: ${success};
    border-color: ${success};
  }
`;

export default function ProductPage({ product }) {
  const { categories } = useContext(DataContext);
  const router = useRouter();

  const handleGoBack = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <Layout title={`B.R.D | ${product?.title?.toUpperCase()}`}>
      <CategoriesComponent categories={categories} />
      <CenterDiv>
        <FlexStyled>
          <BackButton onClick={handleGoBack} />
        </FlexStyled>
        <ColWrapper>
          <ProductImages images={product?.images} name={product?.title} />

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
              <div>
                <span style={{ color: success, fontSize: 20 }}>
                  Precio Venta:
                </span>
                <Price>${product.salePrice}</Price>
              </div>
            </Info>
            <Info>
              <div>
                <span style={{ color: grey, fontSize: 16 }}>
                  Disponibilidad:
                </span>
                <span>
                  <strong>{product?.quantity}</strong>
                </span>
              </div>
              <div>
                <span style={{ color: grey, fontSize: 16 }}>Marca:</span>
                <span>
                  <strong>{product?.brand}</strong>
                </span>
              </div>
            </Info>

            <WrapperButton>
              <CompatibilityModal product={product} />
              <Link href={"/"}>
                <ButtonCard $black={1}>
                  <CardIcon />
                </ButtonCard>
              </Link>
            </WrapperButton>
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

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
