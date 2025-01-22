import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export const useCustomer = () => {

  const { data, error, isLoading, mutate } = useSWR(
    "/api/customers/",
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  return {
    customer: data || {},
    isLoading,
    isError: !!error,
    mutate,
  };
};
