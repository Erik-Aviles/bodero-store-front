import useSWR from "swr";
import { fetchProductsFilter } from "@/utils/FetchProductsFilter";

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
    products: data?.products || [],
    totalProducts: data?.totalProducts || 0,
    isLoading,
    isError: error,
    isValidating,
  };
};

export default useProductsFilter;

/* const useProductsFilter = (search, minLength) => {
  const { data, error, isLoading } = useSWR(
    search ? [search, minLength] : null,
    ([search, minLength]) => fetchProductsFilter(search, minLength),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      shouldRetryOnError: false,
    }
  );

  return {
    products: data,
    isLoading,
    isError: error,
  };
};
export default useProductsFilter; */
