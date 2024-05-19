import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { error, greylight, primary } from "@/lib/colors";
import { useRouter } from "next/router";
import { AllDeleteIcon, SearchIcon } from "./Icons";

const WrapperProductFilter = styled.div`
  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

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

const WrapperInputAutocomplete = styled.div`
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

const InputAutocomplete = styled.input`
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
  @media screen and (min-width: 640px) {
    width: 400px;
  }
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

const SearchProducts = ({ search, onClear, HandleSearch }) => {
  const router = useRouter();
  const initialRender = useRef(true);

  const [text, setText] = useState(search || "");
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!text) {
      onClear();
    } else {
      router.push(`/busqueda?q=${text.toLowerCase()}`);
    }
  }, [text]);

  const onHandle = () => {
    onClear();
    setText("");
  };

  return (
    <WrapperProductFilter>
      <FilterGroup>
        <Customform>
          <WrapperInputAutocomplete>
            <InputAutocomplete
              type="text"
              list="title_product"
              value={text ? text : search}
              onChange={(e) => setText(e.target.value)}
              placeholder="Buscar..."
            />
            <div style={{ width: "32px", height: "100%" }}>
              <ButtonClear
                onClick={onHandle}
                disabled={text?.length && search?.length === 0}
              >
                <AllDeleteIcon />
              </ButtonClear>
            </div>
            <ButtonSearch onClick={HandleSearch}>
              <SearchIcon />
            </ButtonSearch>
          </WrapperInputAutocomplete>
        </Customform>
      </FilterGroup>
    </WrapperProductFilter>
  );
};
export default SearchProducts;
