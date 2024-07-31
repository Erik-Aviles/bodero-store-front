import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

const useProductsAll = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `/api/products/all`,
    fetcher
  );

  return {
    products: data?.products,
    IsError: error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default useProductsAll;
