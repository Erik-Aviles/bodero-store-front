import axios from "axios";
import { normalizeQuery } from "./normalize";

export const getData = async (url) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/${url}`, {
      method: "GET",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error; // Re-lanza el error para que pueda ser manejado por el código que llama a esta función
  }
};

export const getProducts = async ({ query, page = 1, limit = 10 }) => {
  try {
    const valueQuery = normalizeQuery(query.toLowerCase());

    const response = await axios(
      `http://localhost:3000/api/search?q=${valueQuery}&page=${page}&limit=${limit}`
    );

    let filterData = response.data.filter(
      (product) =>
        normalizeQuery(product.title.toLowerCase()).includes(valueQuery) ||
        normalizeQuery(product.code.toLowerCase()).includes(valueQuery) ||
        normalizeQuery(product.codeWeb.toLowerCase()).includes(valueQuery) ||
        normalizeQuery(product.codeEnterprise.toLowerCase()).includes(
          valueQuery
        )
    );

    console.log(filterData);
    return filterData;
  } catch (error) {
    console.error("Error al obtener los productos", error);
    return { error };
  }
};
