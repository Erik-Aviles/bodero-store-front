import axios from "axios";

export const getProducts = async ({ query, page = 1, limit = 10 }) => {
  try {
    const response = await axios.get(`/api/search`, {
      param: {
        query,
        page,
        limit,
      },
    });
    const data = response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return { error };
  }
};
