import SkeletorCategories from "../skeletor/SkeletorCategories";
import { FlexStyled } from "../stylesComponents/Flex";
import { grey, secondary } from "@/lib/colors";
import Center from "../stylesComponents/Center";
import Title from "../stylesComponents/Title";
import styled, { css } from "styled-components";
import { BsArrowRight } from "react-icons/bs";
import { fetcher } from "@/utils/fetcher";
import ItemCard from "./ItemCard";
import { Loader } from "../Loader";
import Link from "next/link";
import useSWR from "swr";

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
  height: 230px;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  gap: 15px;
  padding: 0 2px;
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

export default function CategoriesInStar({ categories, isLoading }) {
  return (
    <Center>
      <Title>Categorias</Title>
      <FlexStyled style={{ padding: 0 }} $center={1} aria-label="breadcrumb">
        <Text>Todo lo que necesitas para tu vehículo, sin salir de casa.</Text>
      </FlexStyled>
      <Wrapper>
        <FlexLink>
          <FlexStyled>
            <Text>Existen </Text>
            <Text $big={1}>
              {isLoading ? <Loader /> : categories?.totalCategories}
            </Text>
            <Text> categorias. </Text>
          </FlexStyled>
          <Link href="/categories">
            <Text $big={1}>
              Ver Todas <BsArrowRight />
            </Text>
          </Link>
        </FlexLink>

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
    </Center>
  );
}
