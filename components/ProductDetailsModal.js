import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { black, grey, greylight, primary, success, white } from "@/lib/colors";
import { AllDeleteIcon } from "./Icons";
import { TitleH4 } from "./stylesComponents/TitleH4";
import ProductImages from "./ProductImages";
import { FlexStyled } from "./stylesComponents/Flex";
import ButtonClose from "./buttonComponents/ButtonClose";

const Container = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: transparent;
`;

const DopDownContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 3;
  right: 0;
  background-color: rgba(37, 37, 37, 0.5);
  backdrop-filter: blur(5px);
`;

const WrapperdDopDown = styled.div`
  max-height: 90%;
  max-width: 500px;
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 4;
  border-radius: 5px;
  outline: 0.1px solid ${greylight};
  background-color: #f7f7f7;
  box-shadow: 0 0 10px rgb(0 0 0 / 30%);
`;

const BodyProductDetailsModal = styled.article`
  padding: 0 20px;
  margin: 20px 0;
  overflow-y: auto;
`;

const NameProduct = styled.h4`
  margin: 0;
  padding: 10px 0;
  font-size: 12px;
  color: ${primary};
  @media screen and (min-width: 360px) {
    font-size: 14px;
  }
  @media screen and (min-width: 768px) {
    font-size: 1rem;
  }
`;

const Price = styled.span`
  display: block;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
`;

const TextP = styled.p`
  display: block;
  margin: 0;
`;

const TextSmall = styled.span`
  color: ${grey};
  font-size: 10px;
  white-space: nowrap;
  strong {
    margin-right: 5px;
  }
  @media screen and (min-width: 360px) {
    font-size: 12px;
  }
  @media screen and (min-width: 768px) {
    font-size: 14px;
  }
`;

const CompatibilyArticle = styled.article`
  padding: 0.5rem;
  margin: 0;
  border: 1px solid ${greylight};
  border-radius: 0.5rem;
  background-color: ${white};
`;
const NameCompatibily = styled.p`
  margin: 0 0 4px;
  color: ${primary};
`;
const ListCompatibily = styled.span`
  color: ${grey};
  margin: 0;
  font-size: 0.6rem;
  word-break: break-all;
  display: flex;
  flex-direction: column;
`;
const FlexModel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ProductDetailsModal = ({ toggleProductDetailsModal, product }) => {
  return (
    <Container>
      <DopDownContainer />
      <WrapperdDopDown>
        <ButtonClose onClick={toggleProductDetailsModal} />
        <BodyProductDetailsModal>
          <FlexStyled $between={1}>
            <NameProduct>{product.title.toUpperCase()}</NameProduct>
            <TextSmall>
              <strong>Cod:</strong>
              {product?.code}
            </TextSmall>
          </FlexStyled>
          <ProductImages images={product?.images} name={product?.title} />

          <FlexStyled $between={1}>
            <span style={{ color: success }}>
              <strong>{product?.brand.toUpperCase()}</strong>
            </span>
            <span style={{ color: grey, fontSize: 16 }}>
              Disponible: <strong>{product?.quantity}</strong>
            </span>
          </FlexStyled>
          <FlexStyled $between={1}>
            <TextP>Compatible con:</TextP>
            <Price>${product.salePrice}</Price>
          </FlexStyled>
          <FlexModel>
            {product.compatibility.length > 0 &&
              product.compatibility.map((item, index) => (
                <CompatibilyArticle key={index}>
                  <NameCompatibily>{item.title.toUpperCase()}</NameCompatibily>

                  {Array.isArray(item.model) ? (
                    item.model.map((model, index) => (
                      <ListCompatibily key={index}>{model}</ListCompatibily>
                    ))
                  ) : (
                    <ListCompatibily>
                      {item.model.toUpperCase()}
                    </ListCompatibily>
                  )}
                </CompatibilyArticle>
              ))}
          </FlexModel>
        </BodyProductDetailsModal>
      </WrapperdDopDown>{" "}
    </Container>
  );
};
export default ProductDetailsModal;
