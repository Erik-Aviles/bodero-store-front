import React, { useState, useEffect } from "react";
import filterSearch from "@/utils/filterSearch";
import { useRouter } from "next/router";
import styled from "styled-components";
import Center from "./Center";

const FilterGroup = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  width: 100%;
  margin: 20px 0;
`;
const WrapperSelect = styled.div`
  display: flex;
`;
const CustomSelect = styled.select`
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
`;
const Customform = styled.form`
  width: 100%;
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

const Filter = ({ data }) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");

  const { categories } = data;

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
    <Center>
      <FilterGroup>
        <WrapperSelect>
          <CustomSelect value={category} onChange={handleCategory}>
            <option value="all">Todos los productos</option>
            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </CustomSelect>
        </WrapperSelect>

        <Customform autoComplete="off">
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
            <option value="all">Ordenar por:</option>
            <option value="-createdAt">Lo más nuevo</option>
            <option value="oldest">Lo antiguAntiguo</option>
            <option value="-sold">Referencia: más vendido</option>
            <option value="-price">Precio: más caro primero</option>
            <option value="price">Precio: más barato primero</option>
          </CustomSelect>
        </WrapperSelect>
      </FilterGroup>
    </Center>
  );
};

export default Filter;
