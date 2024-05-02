import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled, { css } from "styled-components";
import {
  error,
  grey,
  greylight,
  primary,
  secondary,
  success,
  warning,
} from "@/lib/colors";
import { useRouter } from "next/router";
import { AllDeleteIcon, DeleteIcon, SearchIcon } from "./Icons";
import { useDebounce } from "use-debounce";

const WrapperProductFilter = styled.div`
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

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const WrapperSelect = styled.div`
  display: flex;
`;

const CustomSelect = styled.select`
  width: 150px;
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
    background-color: ${grey};
  }
`;
const Customform = styled.div`
  position: relative;
  width: 100%;
  @media screen and (max-width: 768px) {
    order: 2;
  }
`;
const WrapperSearchAutocomplete = styled.div`
  width: 100%;
  overflow: auto;
  z-index: 1;
  max-height: 450px;
  position: absolute;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
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

const DivAutocomplete = styled.div`
  width: 100%;
  display: flex;
  gap: 0.4rem;
  padding: 0.25rem 0.4rem;
  &:hover {
    background-color: #ebe8e8;
  }
  &:active {
    background-color: #ebe8e8;
  }
  &:focus {
    background-color: #ebe8e8;
  }
`;
const DivAutocompleteText = styled.div`
  white-space: normal;
  h3 {
    margin: 0;
    font-size: 0.7rem;
    font-weight: 500;
    text-transform: uppercase;
  }
  p {
    text-transform: capitalize;
    margin: 0;
    font-size: 0.6rem;
    color: ${grey};
  }
`;
const FigureAutocomplete = styled.figure`
  margin: 0;
  img {
    width: 3rem;
    height: 3rem;
    object-fit: contain;
  }
`;

const SpanItemsAutocomplete = styled.span`
  word-break: break-all;
  font-size: 0.7rem;
  ${(props) =>
    props.$codes &&
    css`
      color: ${success};
    `};
  ${(props) =>
    props.$comp &&
    css`
      color: #365c9b;
    `};
`;

const BreadCrumb = styled.span`
  padding: 0 0 10px 10px;
  display: inline-flex;
  align-items: center;
`;
const TextComb = styled.span`
  display: flex;
  align-items: end;
  gap: 10px;
  font-size: 0.6rem;
  color: ${grey};
  small {
    font-size: 0.65rem;
    color: ${warning};
    font-weight: 500;
    text-transform: capitalize;
  }
`;
const Text = styled.span`
  font-size: 0.8rem;
  color: ${grey};
  ${(props) =>
    props.$big &&
    css`
      color: ${secondary};
      font-weight: 500;
      text-transform: uppercase;
    `};
`;

const SearchProducts = ({ search, onClear, HandleSearch }) => {
  const router = useRouter();
  const initialRender = useRef(true);

  const [text, setText] = useState(search);

  const [query] = useDebounce(text, 750);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!query) {
      onClear();
    } else {
      router.push(`/busqueda?q=${query}`);
    }
  }, [query]);

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
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Buscar..."
            />
            <div style={{ width: "32px", height: "100%" }}>
              <ButtonClear onClick={onHandle} disabled={text.length === 0}>
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
