import styled, { css } from "styled-components";
import { black, error, grey, success, white, white2 } from "@/lib/colors";
import ButtonLink from "./buttonComponents/ButtonLink";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons";
import logo from "../public/logo.jpg";
import awsS3Loader from "./loaderes/awsS3Loader";
import localLoader from "./loaderes/localLoader";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";
import ProductDetailsModal from "./ProductDetailsModal";
import { useRouter } from "next/router";

const ProductWrapper = styled.div`
  width: 9rem;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background-color: ${white};
  border: 1px solid rgba(255, 0, 0, 0.5);
  border-radius: 0.25rem;
  margin: 8px auto;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  @media screen and (min-width: 360px) {
    width: 11rem;
  }

  @media screen and (min-width: 768px) {
    box-shadow: none;
    &:hover {
      transform: scale(1);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
  }
`;

const ImageBox = styled.figure`
  position: relative;
  height: 180px;
  width: 100%;
  margin: 0;
`;
const ImgCard = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  right: 0;
  border: none;
  border-radius: 0 0.25rem 0 1.2rem;
  background-color: ${black};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  color: ${white2};
  &:hover {
    background-color: #5e5b5b;
    cursor: pointer;
  }
  &:active {
    background-color: ${success};
  }
  &:disabled {
    &:active {
      background: #5e5b5b;
    }
    &:hover {
      cursor: no-drop;
    }
  }
`;
const ItemImage = styled(Image)`
  width: 100%;
  height: 180px;
  object-fit: scale-down;
  cursor: pointer;
`;

const ProductInfoBox = styled.div`
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
  p {
    font-size: 0.8rem;
    line-height: 1.2rem;
    max-height: 52px;
    overflow: hidden;
    margin: 0;
    text-transform: uppercase;
  }
`;

const Title = styled.h5`
  height: 30px;
  font-size: 0.8rem;
  margin-top: 0;
  margin: 0;
  overflow: hidden;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 5px 0;
`;
const Price = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;
const SpanCard = styled.span`
  font-size: 0.5rem;
  text-transform: uppercase;
  ${(props) =>
    props.$error &&
    css`
      color: ${error};
    `};
  ${(props) =>
    props.$success &&
    css`
      color: ${success};
    `};
  ${(props) =>
    props.$brand &&
    css`
      color: ${grey};
    `};
`;

export function ProductBox({ ...product }) {
  const router = useRouter();
  const path = router.pathname;

  const [showProductDetailsModal, setShowProductDetailsModal] = useState(false);

  useEffect(() => {
    if (showProductDetailsModal && path !== "/") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showProductDetailsModal]);

  const toggleProductDetailsModal = () => {
    setShowProductDetailsModal(!showProductDetailsModal);
  };

  const { addProduct, cartProducts, removeOneProduct } =
    useContext(CartContext);

  const checkProductInCart = (product) => {
    return cartProducts.some((item) => item === product);
  };
  const isProductInCart = checkProductInCart(product._id);

  return (
    <>
      <ProductWrapper>
        <ImageBox>
          <ImgCard
            disabled={product?.quantity === 0 ? true : false}
            style={{
              backgroundColor: isProductInCart ? success : null,
            }}
            title={isProductInCart ? "Elimina del carrito" : "Agregar carrito"}
            onClick={() =>
              isProductInCart
                ? removeOneProduct(product._id)
                : addProduct(product._id)
            }
          >
            {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
          </ImgCard>
          <ItemImage
            loader={product?.images?.[0] ? awsS3Loader : localLoader}
            src={product?.images?.[0] ? product?.images?.[0] : logo}
            alt={product?.title.toUpperCase()}
            title="Vista previa"
            width={450}
            height={450}
            onClick={toggleProductDetailsModal}
          />
        </ImageBox>
        <ProductInfoBox>
          <Title>{product?.title?.toUpperCase()}</Title>
          <Row>
            <Price>${product?.salePrice}</Price>
            {product?.quantity === 0 ? (
              <SpanCard $error={1}>¡Agotado!</SpanCard>
            ) : (
              <SpanCard $success={1}>¡En stock!</SpanCard>
            )}
          </Row>
          <SpanCard $brand={1}>{product?.brand}</SpanCard>
          <p>{product?.description}</p>
          <Row>
            <ButtonLink
              href={`/product/${product._id}`}
              $black={1}
              $outline={1}
              $block={1}
            >
              VER DETALLES
            </ButtonLink>
          </Row>
        </ProductInfoBox>
      </ProductWrapper>
      {showProductDetailsModal && path !== "/" && (
        <ProductDetailsModal
          toggleProductDetailsModal={toggleProductDetailsModal}
          product={product}
        />
      )}
    </>
  );
}
