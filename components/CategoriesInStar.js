import Center from "./stylesComponents/Center";
import Title from "./stylesComponents/Title";
import { useContext } from "react";
import { DataContext } from "@/context/DataContext";
import ItemCard from "./ItemCard";
import styled, { css } from "styled-components";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import { FlexStyled } from "./stylesComponents/Flex";
import { grey, secondary } from "@/lib/colors";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: 20px 20px 50px 20px;
  span {
    text-align: end;
  }
`;

const ListHorizontalCategory = styled.ul`
  width: 100%;
  position: relative;
  overflow: auto;
  display: flex;
  gap: 15px;
  padding-bottom: 30px;
  li {
    min-width: 200px;
    border: 1px solid rgba(255, 0, 0, 0.5);
  }
`;

const FlexLink = styled.div`
  width: 100%;
  display: Flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
`;

const Text = styled.span`
  color: ${grey};
  font-size: 0.8rem;
  padding: 0 10px;
  @media screen and (min-width: 641px) {
    padding: 0;
    font-size: 1rem;
  }
  ${(props) =>
    props.$big &&
    css`
      color: ${secondary};
      font-weight: 500;
    `};
`;

export default function CategoriesInStar() {
  const { categories } = useContext(DataContext);
  const fewCategories = categories.slice(0, 4);
  return (
    <Center>
      <Title>Categorias</Title>
      <FlexStyled style={{ padding: 0 }} $center={1} aria-label="breadcrumb">
        <Text>Todo lo que necesitas para tu vehículo, sin salir de casa.</Text>
      </FlexStyled>
      <Wrapper>
        <FlexLink>
          <Text>Existen {categories.length} categorias, </Text>
          <Link href="/categories">
            <Text $big={1}>
              Ver Todas <BsArrowRight />
            </Text>
          </Link>
        </FlexLink>
        <ListHorizontalCategory>
          {categories.map((item) => (
            <ItemCard item={item} />
          ))}
        </ListHorizontalCategory>
      </Wrapper>
    </Center>
  );
}
