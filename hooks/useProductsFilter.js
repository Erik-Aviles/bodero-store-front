import { fetchProductsFilter } from "@/utils/FetchProductsFilter";
import useSWR from "swr";

const useProductsFilter = (search, minLength, page = 1, pageSize = 10) => {
  const { data, error, isLoading, isValidating } = useSWR(
    search ? [search, minLength, page, pageSize] : null,
    ([search, minLength, page, pageSize]) =>
      fetchProductsFilter(search, minLength, page, pageSize),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      shouldRetryOnError: false,
    }
  );

  return {
    products: data || [],
    totalProducts: data?.length || 0,
    isLoading,
    isError: error,
    isValidating,
  };
};

export default useProductsFilter;
