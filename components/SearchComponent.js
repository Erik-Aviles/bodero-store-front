import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { createAutocomplete } from "@algolia/autocomplete-core";
import styled, { css } from "styled-components";
import { grey, success } from "@/lib/colors";
import { DataContext } from "@/context/DataContext";
import filterSearch from "@/utils/filterSearch";
import Link from "next/link";
import { useRouter } from "next/router";

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
    background-color: ${grey}; /* Cambia al color deseado */
  }
`;
const Customform = styled.form`
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
const Input = styled.input`
  position: relative;
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

const DivAutocomplete = styled.div`
  width: 100%;
  display: flex;
  gap: 0.4rem;
  padding: 0.25rem 0.4rem;
  &:hover {
    background-color: #ebe8e8; /* Cambia al color azul-300 */
  }
  &:active {
    background-color: #ebe8e8; /* Cambia al color azul-300 */
  }
  &:focus {
    background-color: #ebe8e8; /* Cambia al color azul-300 */
  }
`;
const DivAutocompleteText = styled.div`
  white-space: normal;
  h3 {
    margin: 0;
    font-size: 0.7rem; /* Equivalente a text-sm */
    font-weight: 500; /* Equivalente a font-semibold */
    text-transform: uppercase;
  }
  p {
    margin: 0;
    font-size: 0.6rem; /* Equivalente a text-xs */
    color: ${grey}; /* Equivalente a text-gray-600 */
  }
`;
const FigureAutocomplete = styled.figure`
  margin: 0;
  img {
    width: 3rem; /* Equivalente a w-10 */
    height: 3rem; /* Equivalente a h-10 */
    object-fit: contain; /* Equivalente a object-contain */
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

const AutocompleteItem = ({
  _id,
  title,
  images,
  code,
  codeEnterprice,
  codeWeb,
  compatibility,
}) => {
  return (
    <li>
      <Link href={`/product/${_id}`}>
        <DivAutocomplete>
          <FigureAutocomplete>
            <img
              src={images?.[0] ? images?.[0] : "/images/vacio.png"}
              alt={title}
            />
          </FigureAutocomplete>
          <DivAutocompleteText>
            <h3>{title}</h3>
            <p>
              {"Cods: "}
              {code && (
                <SpanItemsAutocomplete $codes={1}>{code}</SpanItemsAutocomplete>
              )}
              {codeEnterprice && (
                <SpanItemsAutocomplete $codes={1}>
                  {" _ "}
                  {codeEnterprice}
                  {" _ "}
                </SpanItemsAutocomplete>
              )}
              {codeWeb && (
                <SpanItemsAutocomplete $codes={1}>
                  {" "}
                  {" _ "}
                  {codeWeb}
                </SpanItemsAutocomplete>
              )}
            </p>
            {compatibility?.map((ctd, index) => (
              <p key={index}>
                {ctd.title} {": "}
                <SpanItemsAutocomplete $comp={1}>
                  {ctd.model}
                </SpanItemsAutocomplete>
              </p>
            ))}
          </DivAutocompleteText>
        </DivAutocomplete>
      </Link>
    </li>
  );
};

const SearchComponent = (props) => {
  const { categories } = useContext(DataContext);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false,
  });

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        autoFocus: true,
        placeholder: "Búsqueda de productos...",
        enterKeyHint: "enter",
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () => [
          {
            sourceId: "features-api",
            getItems: async ({ query }) => {
              if (!!query) {
                const res = await fetch(`/api/search?q=${query}`);
                return await res.json();
              }
            },
          },
        ],
        ...props,
      }),
    [props]
  );

  const formRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current,
  });
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  });

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
      search: search ? search.toLocaleLowerCase() : "all",
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
        </WrapperSelect>{" "}
        <Customform ref={formRef} {...formProps}>
          <Input type="text" ref={inputRef} {...inputProps} />
          {autocompleteState.isOpen && (
            <WrapperSearchAutocomplete
              ref={panelRef}
              {...autocomplete.getPanelProps()}
            >
              {autocompleteState.collections.map((colecction, index) => {
                const { items } = colecction;
                return (
                  <section key={`section-${index}`}>
                    {items.length > 0 && (
                      <ul {...autocomplete.getListProps()}>
                        {items?.map((item, index) => (
                          <AutocompleteItem key={item._id} {...item} />
                        ))}
                      </ul>
                    )}
                  </section>
                );
              })}
            </WrapperSearchAutocomplete>
          )}
        </Customform>
      </FilterGroup>
    </WrapperProductFilter>
  );
};
export default SearchComponent;
