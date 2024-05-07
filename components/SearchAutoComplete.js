import React, { useMemo, useRef, useState } from "react";
import { createAutocomplete } from "@algolia/autocomplete-core";
import styled, { css } from "styled-components";
import {
  black,
  grey,
  greylight,
  primary,
  secondary,
  success,
  warning,
} from "@/lib/colors";
import Link from "next/link";
import { useRouter } from "next/router";
import { SearchIcon } from "./Icons";
import { fetchProductsFilter } from "@/utils/FetchProductsFilter";

const WrapperProductFilter = styled.div`
  width: 100%;
  margin: 0;
  @media screen and (min-width: 769px) {
    display: flex;
    align-items: center;
  }
`;

const Customform = styled.form`
  display: block;
  position: relative;
  width: 100%;
  border-radius: 0.25rem;
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.3);
`;
const WrapperSearchAutocomplete = styled.div`
  width: 100%;
  overflow: auto;
  margin-top: 10px;
  z-index: 1;
  max-height: 380px;
  position: absolute;
  background-color: #fff;
  background-clip: padding-box;
  border: 0.2px solid #ced4da;
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
  button {
    padding: 8px 5px;
    border-radius: 0 0.25rem 0.25rem 0;
    background-color: #f2f0f0;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: ${greylight};
    }
    &:focus {
      background-color: ${greylight};
    }
  }
`;
const InputAutocomplete = styled.input`
  width: 100%;
  font-size: 0.8rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem 0 0 0.25rem;
  background-color: #fff;
  outline: none;
  border: none;
  color: #495057;
  overflow: visible;
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
    color: ${black};
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

const AutocompleteItem = ({
  _id,
  title,
  images,
  compatibility,
  quantity,
  brand,
}) => {
  return (
    <li>
      <Link href={`/product/${_id}`}>
        <DivAutocomplete>
          <FigureAutocomplete>
            <img src={images?.[0] ? images?.[0] : "/logo.jpg"} alt={title} />
          </FigureAutocomplete>
          <DivAutocompleteText>
            <h3>{title} </h3>
            <TextComb>
              {"Marca: "}
              <small> {brand}</small>
              {"Cant: "}
              <small>{quantity}</small>
            </TextComb>
            {/* <p>
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
            </p> */}
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

const SearchAutoComplete = ({ props }) => {
  const router = useRouter();
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false,
  });

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: "Búsqueda de productos...",
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () => [
          {
            sourceId: "search-api",
            getItems: async ({ query }) => {
              if (!!query) {
                const products = fetchProductsFilter(query, 4)
                  .then((res) => {
                    return res;
                  })
                  .catch((error) => {
                    console.error("Error en la búsqueda:", error);
                  });
                return products;
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputRef?.current?.value) {
      router.push(`/busqueda?q=${inputRef?.current?.value}`);
    } else {
      router.push("/busqueda");
    }
  };

  return (
    <WrapperProductFilter>
      <Customform ref={formRef} {...formProps}>
        <WrapperInputAutocomplete>
          <InputAutocomplete type="text" ref={inputRef} {...inputProps} />
          <button onClick={handleSearch}>
            <SearchIcon />
          </button>
        </WrapperInputAutocomplete>
        {autocompleteState.isOpen && (
          <WrapperSearchAutocomplete
            ref={panelRef}
            {...autocomplete.getPanelProps()}
          >
            {autocompleteState.collections.map((colecction, index) => {
              const { items } = colecction;
              const quantity = items.length;
              return (
                <section key={`section-${index}`}>
                  {quantity === 0 ? (
                    <p>{"No se han encontrado resultados"}</p>
                  ) : (
                    <ul {...autocomplete.getListProps()}>
                      <BreadCrumb>
                        <Text>
                          {"Resultados: "}
                          {quantity}
                        </Text>
                      </BreadCrumb>
                      {items?.map((item) => (
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
    </WrapperProductFilter>
  );
};
export default SearchAutoComplete;
