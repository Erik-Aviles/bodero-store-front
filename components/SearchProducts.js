import React, { useCallback } from "react";
import { error, greylight, primary } from "@/lib/colors";
import { AllDeleteIcon, SearchIcon } from "./Icons";
import filterSearch from "@/utils/filterSearch";
import { useRouter } from "next/router";
import styled from "styled-components";

const FilterGroup = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  width: 100%;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Customform = styled.div`
  position: relative;
  width: 100%;
  @media screen and (max-width: 768px) {
    order: 2;
  }
`;

const WrapperInputAutocomplete = styled.form`
  position: relative;
  display: flex;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  svg {
    fill: ${primary};
    width: 20px;
    height: 20px;
  }
`;

const InputSearch = styled.input`
  width: 100%;
  font-size: 0.8rem;
  padding: 0.375rem 1.75rem 0.375rem 0.75rem;
  border-radius: 0.25rem 0 0 0.25rem;
  font-weight: 400;
  background-color: #fff;
  outline: none;
  border: none;
  color: #495057;
  overflow: visible;
`;

const ContainerClear = styled.div`
  width: 32px;
  height: 100%;
`;

const ButtonClear = styled.button`
  display: flex;
  align-items: center;
  height: 100%;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${greylight};
  &:hover {
    color: ${error};
  }
  &:disabled {
    display: none;
  }
`;

const ButtonSearch = styled.button`
  padding: 8px 5px;
  border-radius: 0 0.25rem 0.25rem 0;
  background-color: #f2f0f0;
  border: 1px solid #ced4da;
  cursor: pointer;
  &:hover {
    background-color: ${greylight};
  }
  &:focus {
    background-color: ${greylight};
  }
`;

const SearchProducts = ({ name, search, onSubmit, setSearch }) => {
  const router = useRouter();

  const handleChangeInput = useCallback((event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
    filterSearch({ router, q: value, page: 1 });
  }, []);

  const handleClear = useCallback(() => {
    setSearch("");
    filterSearch({ router, q: "", page: "" });
  }, []);

  return (
    <FilterGroup>
      <Customform>
        <WrapperInputAutocomplete onSubmit={onSubmit}>
          <InputSearch
            name={name}
            type="text"
            value={search}
            onChange={handleChangeInput}
            placeholder="Buscar producto..."
          />
          <ContainerClear>
            <ButtonClear type="button" onClick={handleClear} disabled={!search}>
              <AllDeleteIcon />
            </ButtonClear>
          </ContainerClear>
          <ButtonSearch type="submit">
            <SearchIcon />
          </ButtonSearch>
        </WrapperInputAutocomplete>
      </Customform>
    </FilterGroup>
  );
};
export default SearchProducts;
