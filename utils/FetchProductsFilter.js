import { stopwords } from "@/resource/stopwordsData";
import { removeAccents, removePluralEnding } from "./normalize";

export async function fetchProductsFilter(search, minLength) {
  try {
    if (!search || search.trim() === "" || search.length < minLength) {
      return []; // Si la búsqueda está vacía o no alcanza la longitud mínima, retorna un arreglo vacío
    }

    const searchParts = removeAccents(search.toLowerCase())
      .split(" ")
      .filter((part) => !stopwords.includes(part))
      .map((part) => removePluralEnding(part));

    const apiUrl = `/api/search?q=${searchParts}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Error al obtener datos de la API");
    }

    const data = await response.json();

    const filteredResults = data.filter((item) => {
      const title = removeAccents(item.title.toLowerCase());
      const code = removeAccents(item.code.toLowerCase());
      const codeEnterprise = removeAccents(item.codeEnterprise.toLowerCase());
      const codeWeb = removeAccents(item.codeWeb.toLowerCase());
      const brand = removeAccents(item.brand.toLowerCase());
      const compatibilityModels = (item.compatibility || []).map((compat) =>
        removeAccents(compat.model.toLowerCase())
      );

      const matchesAllParts = searchParts.every((part) => {
        return (
          title.includes(part) ||
          code.includes(part) ||
          codeEnterprise.includes(part) ||
          codeWeb.includes(part) ||
          brand.includes(part) ||
          compatibilityModels.some((model) => model.includes(part))
        );
      });
      return matchesAllParts;
    });

    return filteredResults; // Retorna los resultados filtrados
  } catch (error) {
    console.error("Error en la búsqueda:", error);
    return []; // En caso de error, retorna un arreglo vacío
  }
}
