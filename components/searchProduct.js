import React, { useState } from "react";
import styled from "styled-components";
import Center from "./Center";

const products = [
  { id: 1, name: "Producto 1" },
  { id: 2, name: "Producto 2" },
  { id: 3, name: "Producto 3" },
  // Agrega más productos según sea necesario
];

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;
`;

const SearchProduct = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (term) => {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };

  return (
    <Center>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleChange}
        />

        {/* Puedes mostrar los resultados de la búsqueda aquí */}
        {searchResults.length > 0 && (
          <ul>
            {searchResults.map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        )}
      </SearchContainer>
    </Center>
  );
};

export default SearchProduct;
