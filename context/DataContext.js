import { getData } from "@/utils/FetchData";
import { useRouter } from "next/router";
import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const query = router.query;
  const page = query.page || 1;
  const category = query.category || "all";
  const sort = query.sort || "";
  const q = query.q || "";

  useEffect(() => {
    getData("categories").then((res) => {
      if (res.err) console.error("Error al obtener categorías:", res.err);
      setCategories(res);
    });
  }, []);

  return (
    <DataContext.Provider value={{ categories }}>
      {children}
    </DataContext.Provider>
  );
};
