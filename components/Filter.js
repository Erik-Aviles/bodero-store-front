import React, { useState, useEffect, useMemo, useContext } from "react";
import filterSearch from "@/utils/filterSearch";
import { useRouter } from "next/router";
import styled from "styled-components";
import { grey } from "@/lib/colors";
import { useCategories } from "@/context/CategoryContext";

const WrapperProductFilter = styled.div`
  margin: 0 20px 20px;
  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;
const TitleH3 = styled.h3`
  display: none;
  @media screen and (max-width: 768px) {
    color: ${grey};
    display: block;
  }
`;
const FilterGroup = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  width: 100%;
  margin: 20px 0;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const WrapperSelect = styled.div`
  display: flex;
`;

const CustomSelect = styled.select`
  width: 200px;
  text-transform: capitalize;
  display: inline-block;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 1.75rem 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  vertical-align: middle;
  background: #fff
    url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e")
    no-repeat right 0.75rem center/8px 10px;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  appearance: none;
  @media screen and (max-width: 768px) {
    width: 100%;
    order: 1;
  }
`;

const StyledOption = styled.option`
  font-size: 0.8rem;
  &:hover {
    background-color: ${grey}; /* Cambia al color deseado */
  }
`;
const Customform = styled.form`
  width: 100%;
  @media screen and (max-width: 768px) {
    order: 2;
  }
`;
const Input = styled.input`
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  overflow: visible;
`;

const Filter = () => {
  const {
    data: categories,
    data,
    error,
    isLoading,
    isValidating,
    mutate,
    page,
    handlePageChange,
  } = useCategories();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");

  const router = useRouter();

  const handleCategory = (e) => {
    setCategory(e.target.value);
    filterSearch({ router, category: e.target.value });
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    filterSearch({ router, sort: e.target.value });
  };

  useEffect(() => {
    filterSearch({
      router,
      search: search ? search.toLowerCase() : "all",
    });
  }, [search]);

  return (
    <WrapperProductFilter>
      <FilterGroup>
        <WrapperSelect>
          <CustomSelect value={category} onChange={handleCategory}>
            <StyledOption value="all"> Categorias </StyledOption>
            {categories.map((item) => (
              <StyledOption key={item._id} value={item._id}>
                {item.name}
              </StyledOption>
            ))}
          </CustomSelect>
        </WrapperSelect>

        <Customform>
          <Input
            type="text"
            placeholder="Buscar..."
            list="title_product"
            value={search.toLowerCase()}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Customform>

        <WrapperSelect>
          <CustomSelect value={sort} onChange={handleSort}>
            <StyledOption value="all">Ordenar por:</StyledOption>
            <StyledOption value="-createdAt">Lo más nuevo</StyledOption>
            <StyledOption value="oldest">Lo mas antiguo</StyledOption>
            <StyledOption value="-salePrice">
              Precio: más caro primero
            </StyledOption>
            <StyledOption value="salePrice">
              Precio: más barato primero
            </StyledOption>
          </CustomSelect>
        </WrapperSelect>
      </FilterGroup>
    </WrapperProductFilter>
  );
};

export default Filter;
