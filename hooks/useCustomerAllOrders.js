import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export const useCustomerAllOrders = () => {

  const { data, error, isLoading, mutate } = useSWR(
    "/api/customers/orders",
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  return {
    orders: data?.orders || [],
    isLoading,
    isError: !!error,
    mutate,
  };
};
