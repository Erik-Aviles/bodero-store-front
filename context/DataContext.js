import { getData } from "@/utils/FetchData";
import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getData("categories").then((res) => {
      if (res.err) console.error("Error al obtener categorías:", res.err);
      setCategories(res);
    });

    getData("products").then((res) => {
      if (res.err) console.error(" Error al obtener productos:", res.err);
      setProducts(res);
    });
  }, []);

  const data = { products, categories };

  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  );
};
