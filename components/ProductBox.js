import styled, { css } from "styled-components";
import { error, success, white, white2 } from "@/lib/colors";
import ButtonLink from "./ButtonLink";
import { WhatsappIcon } from "./Icons";
import Button from "./Button";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

const ProductWrapper = styled.div`
  width: 18rem;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background-color: ${white};
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  margin: 8px auto;
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: scale(1);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
`;

const WhiteBox = styled.img`
  height: 220px;
  border-radius: 0.25rem 0.25rem 0 0;
  object-position: 50%;
  object-fit: cover;
  ${"" /* cambiar si es necesario con cover */}
`;

const ProductInfoBox = styled.div`
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  p {
    font-size: 0.8rem;
    line-height: 1.2rem;
    height: 52px;
    overflow: hidden;
    margin: 0;
  }
`;

const Title = styled.h5`
  font-size: 1rem;
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
  span {
    font-size: 0.8rem;
  }
`;
const Price = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

export default function ProductBox({ ...product }) {
  const url = "/product/" + product?._id;
  const router = useRouter();
  const targetRef = useRef(null);

  useEffect(() => {
    const targetDiv = document.getElementById("targetDiv");
    if (targetDiv) {
      window.scrollTo({
        top: targetDiv.offsetTop,
        behavior: "smooth",
      });
    }
  }, [targetRef]);

  const onProductClick = (productId) => {
    targetRef.current = router.asPath;
    router.push(`/product/${productId}`);
  };

  return (
    <ProductWrapper>
      <WhiteBox
        src={product?.images?.[0]}
        alt={product?.title.toUpperCase()}
        title={product?.title.toUpperCase()}
      />
      <ProductInfoBox>
        <Title ref={targetRef} id="targetDiv" href={url}>
          {product?.title?.toUpperCase()}
        </Title>
        <Row>
          <Price>${product?.salePrice}</Price>
          {product?.quantity === 0 ? (
            <span style={{ color: error }}>¡Agotado!</span>
          ) : (
            <span style={{ color: success }}>¡En stock!</span>
          )}
        </Row>
        <p>{product?.description}</p>
        <Row>
          <Button
            onClick={() => onProductClick(product?._id)}
            $black={1}
            $outline={1}
          >
            VER DETALLES
          </Button>
          <ButtonLink
            href={`https://api.whatsapp.com/send/?phone=593962902500&text=Hola, me interesa comprar este producto. Producto: ${product?.title?.toUpperCase()}, Código: ${
              product?.code
            }&type=phone_number&app_absent=1`}
            target="_blank"
            rel="noopener noreferrer"
            title={"Realizar pedido por Whatsapp"}
            secondary={1}
          >
            <WhatsappIcon height={25} width={25} />
            PEDIR
          </ButtonLink>
        </Row>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
