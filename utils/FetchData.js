export const getData = async (url) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/${url}`, {
      method: "GET",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error al obtener los datos:", error.message);
    throw error; // Re-lanza el error para que pueda ser manejado por el código que llama a esta función
  }
};

export const getSearchData = async ({ page, category, limit, sort, q }) => {
  try {
    const response = await fetch(
      `${process.env.PUBLIC_URL}/api/search?p=${q}&limit=${limit}&category=${category}&page=${page}&sort=${sort}`,
      {
        headers: {
          "Content-Type": "application/json", // Ejemplo de otro encabezado
        },
      }
    );

    if (!response.ok) {
      throw new Error("La respuesta de la red no fue correcta");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los datos:", error.message);
    throw error;
  }
};
