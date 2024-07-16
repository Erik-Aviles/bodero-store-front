import { stopwords } from "@/resource/stopwordsData";
import { removeAccents, removePluralEnding } from "./normalize";

export async function fetchProductsFilter(
  search,
  minLength,
  page = 1,
  pageSize = 10
) {
  try {
    if (!search || search.trim() === "" || search.length < minLength) {
      return { products: [], totalProducts: 0 };
    }

    const searchParts = removeAccents(search.toLowerCase())
      .split(" ")
      .filter((part) => !stopwords.includes(part))
      .map((part) => removePluralEnding(part));

    const apiUrl = `/api/search?q=${searchParts.join(
      "+"
    )}&page=${page}&pageSize=${pageSize}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Error al obtener datos de la API");
    }

    const { products, totalProducts } = await response.json();

    return { products, totalProducts };
  } catch (error) {
    console.error("Error en la búsqueda:", error);
    return { products: [], totalProducts: 0 };
  }
}

export async function fetchProductsFilterForCategory(
  category,
  page = 1,
  pageSize = 10
) {
  try {
    const apiUrl = `/api/search?category=${category}&page=${page}&pageSize=${pageSize}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Error al obtener datos de la API");
    }

    const { products, totalProducts } = await response.json();

    return { products, totalProducts };
  } catch (error) {
    console.error("Error en la búsqueda:", error);
    return { products: [], totalProducts: 0 };
  }
}

/* import { stopwords } from "@/resource/stopwordsData";
import { removeAccents, removePluralEnding } from "./normalize";

export async function fetchProductsFilter(search, minLength) {
  console.log(minLength);
  try {
    if (!search || search.trim() === "" || search.length < minLength) {
      return [];
    }

    const searchParts = removeAccents(search.toLowerCase())
      .split(" ")
      .filter((part) => !stopwords.includes(part))
      .map((part) => removePluralEnding(part));

    const apiUrl = `/api/search?q=${searchParts.join("+")}`;
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
      const compatibilityTitle = (item.compatibility || []).map((compat) =>
        removeAccents(compat.title.toLowerCase())
      );

      const matchesAllParts = searchParts.every((part) => {
        return (
          title.includes(part) ||
          code.includes(part) ||
          codeEnterprise.includes(part) ||
          codeWeb.includes(part) ||
          brand.includes(part) ||
          compatibilityModels.some((model) => model.includes(part)) ||
          compatibilityTitle.some((title) => title.includes(part))
        );
      });
      return matchesAllParts;
    });
    console.log(filteredResults);
    return filteredResults;
  } catch (error) {
    if (error.name !== "Error de cancelación") {
      console.error("Error en la búsqueda:", error);
    }
    return [];
  }
}
 */
