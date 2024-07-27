import { NextArrow, PrevArrow } from "./buttonComponents/Arrows";
import { black, blacklight, primary, white } from "@/lib/colors";
import SkeletorProducts from "./skeletor/SkeletorProducts";
import Text from "./stylesComponents/HighlightedText";
import GoButton from "./buttonComponents/GoButton";
import { ProductBox } from "./ProductBox";
import styled from "styled-components";
import { Loader } from "./Loader";
import { useRef } from "react";

const ContainerSesion = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 640px) {
    padding: 20px;
  }
  @media screen and (min-width: 1024px) {
    align-items: center;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  height: auto;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  color: ${black};
  @media screen and (min-width: 768px) {
    font-size: 1.8rem;
  }
`;
const BreadCrumb = styled.span`
  padding-left: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  @media screen and (min-width: 640px) {
    padding: 0;
  }
`;

const ContainerScrol = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const ProductOffertList = styled.ul`
  display: flex;
  gap: 15px;
  margin: 0;
  padding: 20px 0;
  overflow-x: scroll;
  list-style: none;
  white-space: normal;
  /* Estilos para el scrollbar horizontal */
  &::-webkit-scrollbar {
    height: 8px; /* Altura del scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* Color de fondo del track del scrollbar */
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${primary}; /* Color del pulgar del scrollbar */
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${black}; /* Color del pulgar del scrollbar cuando está en hover */
  }
`;

export default function ExclusiveProductoffers({
  products,
  isLoading,
  totalOnOffetProducts,
}) {
  const containerRef = useRef(null);

  const scroll = (direction) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: direction === "next" ? 180 : -180,
        behavior: "smooth",
      });
    }
  };
  return (
    <ContainerSesion>
      <Title>Ofertas Exclusivas!</Title>
      <Wrapper>
        <BreadCrumb>
          <Text>
            Total{" "}
            <Text $big={1}>
              {isLoading ? <Loader /> : totalOnOffetProducts}
            </Text>{" "}
            , productos. Ofertas por tiempo limitado
          </Text>
          <GoButton href="/products" fill="" />
        </BreadCrumb>
        <ContainerScrol>
          <PrevArrow
            fill="#000"
            hoverFill="#f1f1f1"
            hoverBgColor="#000"
            hoverBorderColor="white"
            onClick={() => scroll("prev")}
          />
          <ProductOffertList ref={containerRef}>
            {isLoading || !products ? (
              <SkeletorProducts />
            ) : (
              products.map((product) => (
                <ProductBox key={product._id} {...product} />
              ))
            )}
          </ProductOffertList>
          <NextArrow
            fill="#000"
            hoverFill="#f1f1f1"
            hoverBgColor="#000"
            hoverBorderColor="white"
            onClick={() => scroll("next")}
          />
        </ContainerScrol>
      </Wrapper>
    </ContainerSesion>
  );
}
