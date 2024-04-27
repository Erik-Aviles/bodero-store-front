import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useDebounce } from "use-debounce";
import { normalizeQuery } from "@/utils/normalize";

const StyledInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledIconWrapper = styled.div`
  position: absolute;
  inset-y: 0;
  left: 0;
  display: flex;
  items: center;
  padding-left: 0.75rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.375rem 1rem;
  border: none;
  border-radius: 0.375rem;
  color: #1f2937;
  background-color: transparent;
  border: 1px solid #d1d5db;
  placeholder-color: #9ca3af;
  font-size: 0.875rem;
  line-height: 1.5rem;
  outline: none;
  transition: border-color 0.15s ease-in-out;
  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
  }
`;

const Search = ({ search }) => {
  const router = useRouter();
  const initialRender = useRef(true);

  const [text, setText] = useState(normalizeQuery(search.toLowerCase()));
  // const [q] = useDebounce(text, 750);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!text) {
      router.push(`/busqueda`);
    } else {
      router.push(`/busqueda?q=${text}`);
    }
  }, [text]);

  return (
    <StyledInputWrapper>
      <StyledIconWrapper></StyledIconWrapper>
      <StyledInput
        value={normalizeQuery(text.toLowerCase())}
        placeholder="Buscar productos..."
        onChange={(e) => setText(e.target.value)}
      />
    </StyledInputWrapper>
  );
};

export default Search;
