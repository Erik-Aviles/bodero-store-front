import styled from "styled-components";
import { error, success, white } from "@/lib/colors";
import ButtonLink from "./buttonComponents/ButtonLink";
import { WhatsappIcon } from "./Icons";
import Image from "next/image";
import emptyimage from "../public/images/vacio.png";

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

const ImageBox = styled.figure`
  height: 240px;
  width: 100%;
  margin: 0;
`;
const ItemImage = styled(Image)`
  width: 100%;
  height: 240px;
  object-fit: scale-down;
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
  return (
    <ProductWrapper>
      <ImageBox>
        <ItemImage
          src={product?.images?.[0] ? product?.images?.[0] : emptyimage}
          alt={product?.title.toUpperCase()}
          title={product?.title.toUpperCase()}
          width={450}
          height={450}
        />
      </ImageBox>
      <ProductInfoBox>
        <Title>{product?.title?.toUpperCase()}</Title>
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
          <ButtonLink href={`/product/${product._id}`} $black={1} $outline={1}>
            VER DETALLES
          </ButtonLink>
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
