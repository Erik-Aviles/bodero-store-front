import React, { useState, useEffect } from "react";
import filterSearch from "@/utils/filterSearch";
import { useRouter } from "next/router";
import styled from "styled-components";
import Center from "./Center";

const FilterGroup = styled.div`
  padding: 20px 0;
  display: flex;
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
        <div>
          <select value={category} onChange={handleCategory}>
            <option value="all">Todos los productos</option>
            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <form autoComplete="off">
          <input
            type="text"
            placeholder="Buscar..."
            list="title_product"
            value={search.toLowerCase()}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <div>
          <select value={sort} onChange={handleSort}>
            <option value="all">Buscar por:</option>
            <option value="-createdAt">Nuevo</option>
            <option value="oldest">Antiguo</option>
            <option value="-sold">Mas vendido</option>
            <option value="-price">Precio: Alto-Bajo</option>
            <option value="price">Precio: Bajo-Alto</option>
          </select>
        </div>
      </FilterGroup>
    </Center>
  );
};

export default Filter;
