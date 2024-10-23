import { AddToCartIcon, RemoveFromCartIcon } from "./Icons";
import { useContext, useEffect, useState } from "react";
import ProductDetailsModal from "./ProductDetailsModal";
import ButtonLink from "./buttonComponents/ButtonLink";
import { CartContext } from "@/context/CartContext";
import awsS3Loader from "./loaderes/awsS3Loader";
import localLoader from "./loaderes/localLoader";
import { capitalize } from "@/utils/capitalize";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import logo from "../public/logo.jpg";
import Image from "next/image";
import {
  black,
  blacklight,
  error,
  grey,
  success,
  warning,
  white,
  white2,
} from "@/lib/colors";
import AddRemoveCart from "./cart/AddRemoveCart";

const ProductWrapper = styled.div`
  width: 10rem;
  min-width: 10rem;
  display: flex;
  flex-direction: column;
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
  height: 160px;
  width: 100%;
  margin: 0;
`;

const DiscountRibbon = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 0.25rem 0 1.2rem 0;
  background-color: #ffaf00;
  border: 4px solid #ffd700;
  z-index: 1;
  span {
    font-weight: bold;
    font-size: 1rem;
    color: ${white};
  }
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
  height: 160px;
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
    margin: 0;
    text-transform: uppercase;
  }
`;

const Title = styled.h5`
  width: 100%;
  height: 40px;
  font-size: 0.72rem;
  line-height: 0.8rem;
  color: cornflowerblue;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 3px 0;
  ${(props) =>
    props.$column &&
    css`
      gap: 5px;
      flex-direction: column;
    `};
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 600;
  &.onOffer {
    color: ${blacklight};
    text-decoration: line-through;
    font-weight: 300;
    font-size: 0.8rem;
  }
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
  }, [showProductDetailsModal, path]);

  const toggleProductDetailsModal = () => {
    setShowProductDetailsModal(!showProductDetailsModal);
  };

  const { addProduct, cartProducts, removeOneProduct, removeProduct } =
    useContext(CartContext);

  const checkProductInCart = (product) => {
    return cartProducts.some((item) => item === product);
  };
  const isProductInCart = checkProductInCart(product._id);

  const discountPercentage =
    product.offerPrice > 0
      ? ((product.salePrice - product.offerPrice) / product.salePrice) * 100
      : 0;

  return (
    <>
      <ProductWrapper>
        <ImageBox>
          {discountPercentage > 0 && (
            <DiscountRibbon>
              <span>{`-${Math.round(discountPercentage)}%`}</span>
            </DiscountRibbon>
          )}
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
          <Title title={capitalize(product.title)}>
            {product?.title?.toUpperCase()}
          </Title>
          <Row>
            <Price className={discountPercentage && "onOffer"}>
              ${product?.salePrice}
            </Price>
            {discountPercentage ? <Price>${product?.offerPrice}</Price> : null}
          </Row>
          <Row>
            <SpanCard $brand={1}>{product?.brand}</SpanCard>
            {product?.quantity === 0 ? (
              <SpanCard $error={1}>¡Agotado!</SpanCard>
            ) : (
              <SpanCard $success={1}>¡En stock!</SpanCard>
            )}
          </Row>
          <Row $column={1}>
            <AddRemoveCart
              product={product}
              cartProducts={cartProducts}
              addProduct={addProduct}
              removeProduct={removeProduct}
            />
            <ButtonLink href={`/products/${product._id}`} $black={1} $block={1}>
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
