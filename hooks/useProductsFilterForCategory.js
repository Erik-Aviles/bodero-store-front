import useSWR from "swr";
import { fetchProductsFilterForCategory } from "@/utils/FetchProductsFilter";

const useProductsFilterForCategory = (category, page = 1, pageSize = 10) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    category ? [category, page, pageSize] : null,
    ([category, page, pageSize]) =>
      fetchProductsFilterForCategory(category, page, pageSize),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      shouldRetryOnError: false,
    }
  );

  return {
    products: data?.products || [],
    totalProducts: data?.totalProducts || 0,
    isLoadingProduct: isLoading,
    isErrorProducts: error,
    isValidating,
    mutateProducts: mutate,
  };
};

export default useProductsFilterForCategory;
