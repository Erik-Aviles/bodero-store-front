/* export const getData = async (url) => {
  const response = await fetch(`/api/${url}`);
  const data = await response.json();
  return data;
}; */

/* export const getData = async (url) => {
  const res = await axios(`/api/${url}`);

  return res;
};
 */
const baseUrl = process.env.PUBLIC_URL;
export const getData = async (url) => {
  try {
    const response = await fetch(`http://localhost:3001/api/${url}`, {
      method: "GET",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error; // Re-lanza el error para que pueda ser manejado por el código que llama a esta función
  }
};
