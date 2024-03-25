import Link from "next/link";
import styled from "styled-components";
import Center from "./stylesComponents/Center";
import { SearchIcon } from "./Icons";
import { useRouter } from "next/router";
import { useState } from "react";
import SlinderCategories from "./SlinderCategories";
import { black, error, white } from "@/lib/colors";

const DivContainert = styled.div`
  background-color: ${black};
  width: 100%;
  height: auto;
  position: relative;
  box-shadow: none;
  white-space: nowrap;
  select {
    padding-left: 20px;
    display: block;
    font-size: 16px;
    background-color: ${black};
    color: ${white};
    width: 100%;
    height: 44.8px;
    border: 0;
    appearance: none;
    cursor: pointer;
    outline: none;
  }

  @media screen and (min-width: 767px) {
    font-size: 16px;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
    select {
      display: none;
    }
  }
  @media screen and (max-width: 640px) {
    position: fixed;
    z-index: 1;
    margin-top: 105.63px;
  }
`;

const LinkSearch = styled(Link)`
  position: absolute;
  display: inline-block;
  border-left: 1px solid ${white};
  top: 0px;
  right: 5px;
  padding: 0 10px;
  svg {
    width: 40px;
    height: 40px;
    fill: ${white};
    &:hover {
      fill: ${error};
    }
  }
`;

const CategoriesComponent = ({ categories }) => {
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
      <DivContainert>
        <select
          value={category}
          onChange={(e) => handleCategory(e.target.value)}
        >
          <option value="all">CATEGORIAS</option>
          {categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name.toUpperCase()}
            </option>
          ))}
        </select>
        <SlinderCategories categories={categories} />
        <LinkSearch href={"/products/busqueda"} title="Ir a búsqueda">
          <SearchIcon />
        </LinkSearch>
      </DivContainert>
    </Center>
  );
};
export default CategoriesComponent;
