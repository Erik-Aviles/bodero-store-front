import Link from "next/link";
import styled from "styled-components";
import Center from "./stylesComponents/Center";
import { SearchIcon } from "./Icons";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import SlinderCategories from "./SlinderCategories";
import { black, error, white } from "@/lib/colors";
import { DataContext } from "@/context/DataContext";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 0 25px;
  background-color: ${black};
  box-shadow: none;
  white-space: nowrap;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const DivContainert = styled.div`
  width: 100%;
  height: auto;
  position: relative;

  @media screen and (min-width: 767px) {
    font-size: 16px;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
  }
  @media screen and (max-width: 640px) {
    position: fixed;
    z-index: 1;
    margin-top: 75.63px;
  }
`;

const CategoriesComponent = () => {
  const { categories } = useContext(DataContext);
  return (
    <Wrapper>
      <DivContainert>
        <SlinderCategories categories={categories} />
      </DivContainert>
    </Wrapper>
  );
};
export default CategoriesComponent;
