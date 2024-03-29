export const getData = async (url) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/${url}`, {
      method: "GET",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error al obtener los datos :", error.message);
    throw error; // Re-lanza el error para que pueda ser manejado por el código que llama a esta función
  }
};
