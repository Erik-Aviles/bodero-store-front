import { NextArrow, PrevArrow } from "../buttonComponents/Arrows";
import SkeletorCategories from "../skeletor/SkeletorCategories";
import { LeftArrowIcon, RightArrowIcon } from "../Icons";
import Text from "../stylesComponents/HighlightedText";
import { black, primary, white } from "@/lib/colors";
import GoButton from "../buttonComponents/GoButton";
import styled, { css } from "styled-components";
import Title from "../stylesComponents/Title";
import { BsArrowRight } from "react-icons/bs";
import ItemCard from "./ItemCard";
import { Loader } from "../Loader";
import { useRef } from "react";
import Link from "next/link";

const ContainerSesion = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  span {
    text-align: end;
  }
`;
const FlexTitles = styled.div`
  width: 100%;
  display: Flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const FlexInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
`;
const BreadCrumb = styled.span`
  padding-left: 10px;
  display: flex;
  align-items: center;
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

const ListHorizontalCategory = styled.ul`
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

export default function CategoriesInStar({ categories, isLoading }) {
  const containerRef = useRef(null);

  const scroll = (direction) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: direction === "next" ? 207 : -207,
        behavior: "smooth",
      });
    }
  };

  return (
    <ContainerSesion>
      <FlexTitles style={{ padding: 0 }} $center={1} aria-label="breadcrumb">
        <Title>Categorias</Title>
        <Text>Todo lo que necesitas para tu vehículo, sin salir de casa.</Text>
      </FlexTitles>
      <Wrapper>
        <FlexInfo>
          <BreadCrumb>
            <Text>Existen </Text>
            <Text $big={1}>
              {isLoading ? <Loader /> : categories?.totalCategories}
            </Text>
            <Text> categorias. </Text>
          </BreadCrumb>
          <GoButton href="/categories" />
        </FlexInfo>
        <ContainerScrol>
          <PrevArrow
            fill="#000"
            hoverFill="#f1f1f1"
            hoverBgColor="#000"
            hoverBorderColor="white"
            onClick={() => scroll("prev")}
          />
          <ListHorizontalCategory ref={containerRef}>
            {isLoading ? (
              <SkeletorCategories />
            ) : (
              categories?.categories?.map((item) => (
                <ItemCard key={item._id} item={item} />
              ))
            )}
          </ListHorizontalCategory>
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
