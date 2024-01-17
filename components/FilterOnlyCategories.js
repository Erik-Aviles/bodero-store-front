import { black, white, primary } from "@/lib/colors";
import Link from "next/link";
import styled, { css } from "styled-components";
import Center from "./Center";
import { SearchIcon } from "./Icons";
import { useRouter } from "next/router";
import { useState } from "react";

const StyleNav = styled.nav`
  width: 100%;
  background-color: ${black};
  font-size: 16px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${white};

  @media screen and (max-width: 768px) {
    width: 30%;

    padding: 0 0 10px 20px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  @media screen and (min-width: 769px) {
    font-size: 14px;
    background-color: ${black};
    height: 45px;
    gap: 20px;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
    overflow: hidden;
  }
  @media screen and (min-width: 1024px) {
    font-size: 16px;
  }
`;

const StaledCss = css`
  text-decoration: none;
  cursor: pointer;
  padding: 0;
  color: ${white};
  svg {
    fill: ${white};
  }
  &:hover {
    border-bottom: 3px solid ${primary};
    color: ${primary};
  }
  ${(props) =>
    props.other &&
    css`
      align-items: end;
      &:hover {
        border-bottom: 0;
        svg {
          fill: ${primary};
        }
      }
    `};
  ${(props) =>
    props.active &&
    css`
      border-bottom: 3px solid ${primary};
      color: ${primary};
    `};
  ${(props) => props.inactive && css``};
`;
const SelectContainerCategories = styled.div`
  display: none;
`;
const SelectCategories = styled.select``;
const StyledText = styled.p`
  ${StaledCss}
`;
const StyledLink = styled(Link)`
  ${StaledCss}
`;

const FilterOnlyCategories = ({ categories, show }) => {
  const [category, setCategory] = useState("");

  const router = useRouter();

  const filterSearchCategory = ({ router, category }) => {
    const query = router.query;
    if (category) {
      query.category = category;
      router.push({
        pathname: "/categories",
        query: query,
      });
    }
  };

  const handleCategory = (id) => {
    setCategory(id);
    filterSearchCategory({ router, category: id });
  };

  return (
    <Center>
      <StyleNav>
        {categories.map((item) =>
          item._id === router?.query?.category ? (
            <StyledText
              key={item._id}
              value={category}
              onClick={() => handleCategory(item._id)}
              active={1}
            >
              {item.name.toUpperCase()}
            </StyledText>
          ) : (
            <StyledText
              key={item._id}
              value={category}
              onClick={() => handleCategory(item._id)}
              inactive={1}
            >
              {item.name.toUpperCase()}
            </StyledText>
          )
        )}

        <StyledLink other={1} href={"/products"} title="Ir a búsqueda">
          <SearchIcon />
        </StyledLink>
      </StyleNav>
    </Center>
  );
};
export default FilterOnlyCategories;
