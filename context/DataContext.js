import { getData } from "@/utils/FetchData";
import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getData("categories").then((res) => {
      if (res.err) console.error("Error al obtener categorías:", res.err);
      setCategories(res.categories);
    });
  }, []);

  return (
    <DataContext.Provider value={{ categories }}>
      {children}
    </DataContext.Provider>
  );
};
