import React, { useEffect, useMemo, useRef, useState } from "react";
import { fetchProductsFilter } from "@/utils/FetchProductsFilter";
import { createAutocomplete } from "@algolia/autocomplete-core";
import { AutocompleteItem } from "./AutocompleteItem";
import filterSearch from "@/utils/filterSearch";
import styled, { css } from "styled-components";
import { BsArrowRight } from "react-icons/bs";
import { useRouter } from "next/router";
import { SearchIcon } from "./Icons";
import {
  grey,
  greylight,
  primary,
  secondary,
  success,
  white,
} from "@/lib/colors";

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

const WrapperAutocomplete = styled.section`
  position: relative;
`;

const BreadCrumb = styled.span`
  padding: 0 0 10px 10px;
  display: inline-flex;
  align-items: center;
`;

const Text = styled.span`
  font-size: 0.8rem;
  color: ${grey};
  ${(props) =>
    props.$big &&
    css`
      color: ${secondary};
    `};
`;

const WrapperButtonGoBusqueda = styled.div`
  position: sticky;
  bottom: 10px;
  right: 0;
  display: flex;
  justify-content: end;
  padding: 0 10px;
`;

const ButtonGoBusqueda = styled.button`
  padding: 5px 10px;
  display: flex;
  align--items: center;
  gap: 5px;
  border: 1px solid ${greylight};
  border-radius: 3px;
  background: ${white};
  color: ${success};
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

const SearchAutoComplete = ({ props }) => {
  const router = useRouter();
  const path = router.pathname;
  const formRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const pageSize = 10;
  const minLength = 3;
  const [pag, setPag] = useState(1);
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false,
  });

  useEffect(() => {
    if (autocompleteState.isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "17px";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [autocompleteState.isOpen]);

  const openPanel = () => {
    setAutocompleteState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));
  };

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        id: "autocomplete-search",
        enterKeyHint: "search",
        autoFocus: path === "/busqueda" ? false : true,
        placeholder: "Búsqueda de productos...",
        onStateChange: ({ state }) => {
          setAutocompleteState((prev) => ({
            ...prev,
            collections: state.collections,
            isOpen: state.isOpen,
          }));
        },
        getSources: () => [
          {
            sourceId: "search-api",
            getItems: async ({ query }) => {
              if (!!query) {
                try {
                  const data = await fetchProductsFilter(
                    query,
                    minLength,
                    pag,
                    pageSize
                  );
                  return data;
                } catch (error) {
                  if (error.name !== "Error de cancelación") {
                    console.error(
                      "No se pudieron obtener los productos:",
                      error
                    );
                  }
                  return [];
                }
              }

              return [];
            },
          },
        ],
        ...props,
      }),
    [props]
  );

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current,
  });

  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
    onBlur: () => {
      setTimeout(() => {
        if (document.activeElement !== inputRef.current) {
          setAutocompleteState((prev) => ({
            ...prev,
            isOpen: false,
          }));
        }
      }, 0);
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const queryItems = inputRef?.current?.value;
    if (queryItems) {
      setAutocompleteState((prev) => ({
        ...prev,
        isOpen: false,
      }));
      filterSearch({
        router,
        pathname: "/busqueda",
        q: queryItems.toLowerCase(),
        page: 1,
      });
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
            {autocompleteState.collections.flatMap((colecction, index) => {
              const { items } = colecction;
              const quantity = items?.[0].totalProducts;
              const fewProducts = items?.[0].products;

              return (
                <WrapperAutocomplete key={`section-${index}`}>
                  <ul {...autocomplete.getListProps()}>
                    <BreadCrumb>
                      <Text>
                        {minLength < 3
                          ? "Buscando..."
                          : `Resultados:  ${
                              quantity < pageSize ? quantity : pageSize
                            } de ${quantity}`}
                      </Text>
                    </BreadCrumb>
                    {fewProducts?.map((item) => (
                      <AutocompleteItem
                        key={item._id}
                        {...item}
                        openPanel={openPanel}
                      />
                    ))}
                  </ul>

                  <WrapperButtonGoBusqueda>
                    {quantity > 0 ? (
                      <ButtonGoBusqueda onClick={handleSearch}>
                        Ver todo <BsArrowRight />
                      </ButtonGoBusqueda>
                    ) : (
                      <Text $big={1}>Intenta con otras palabras</Text>
                    )}
                  </WrapperButtonGoBusqueda>
                </WrapperAutocomplete>
              );
            })}
          </WrapperSearchAutocomplete>
        )}
      </Customform>
    </WrapperProductFilter>
  );
};
export default SearchAutoComplete;
