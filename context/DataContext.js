import { getData } from "@/utils/FetchData";
import { useRouter } from "next/router";
import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData("categories").then((res) => {
      if (res.err) console.error("Error al obtener categorías:", res.err);
      setCategories(res);
    });
  }, []);

  function buildUrl(baseUrl, query) {
    const url = new URL(baseUrl);

    const page = query.page || 1;
    const category = query.category || "all";
    const sort = query.sort || "";
    const search = query.search;

    url.searchParams.set("page", page);
    url.searchParams.set("category", category);
    url.searchParams.set("sort", sort);

    if (search !== undefined) {
      url.searchParams.set("title", search);
    }

    return url.toString();
  }

  const router = useRouter();
  const query = router.query;
  const apiUrl = `${process.env.NEXT_PUBLIC_URL}/api/products`;
  const finalUrl = buildUrl(apiUrl, query);

  const fetchData = async () => {
    try {
      const response = await fetch(finalUrl, {
        headers: {
          "Content-Type": "application/json", // Ejemplo de otro encabezado
        },
      });

      if (!response.ok) {
        throw new Error("La respuesta de la red no fue correcta");
      }

      const data = await response.json();
      console.log(data);
      setProducts(data);
      return data;
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ categories, products }}>
      {children}
    </DataContext.Provider>
  );
};
