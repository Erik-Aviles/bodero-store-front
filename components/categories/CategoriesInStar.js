import SkeletorCategories from "../skeletor/SkeletorCategories";
import Text from "../stylesComponents/HighlightedText";
import Title from "../stylesComponents/Title";
import styled, { css } from "styled-components";
import { BsArrowRight } from "react-icons/bs";
import ItemCard from "./ItemCard";
import { Loader } from "../Loader";
import Link from "next/link";

const ContainerSesion = styled.section`
  display: flex;
  gap: 15px;
  flex-direction: column;
  max-width: 1000px;
  margin: 0 auto;
  @media screen and (min-width: 640px) {
    padding: 20px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  display: Flex;
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

const ListHorizontalCategory = styled.ul`
  width: 100%;
  height: 230px;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  gap: 15px;
  padding: 0 20px;
`;

export default function CategoriesInStar({ categories, isLoading }) {
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
          <Link href="/categories">
            <Text $big={1}>
              Ver Todas <BsArrowRight />
            </Text>
          </Link>
        </FlexInfo>
        <ListHorizontalCategory>
          {isLoading ? (
            <SkeletorCategories />
          ) : (
            categories?.categories.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))
          )}
        </ListHorizontalCategory>
      </Wrapper>
    </ContainerSesion>
  );
}
