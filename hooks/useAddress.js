import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

const useAddress = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/customers/address`,
    fetcher,
    {
      shouldRetryOnError: false,
      fallbackData: {
        billingAddress: {},
        shippingAddress: {},
      },
      revalidateOnFocus: false,
    }
  );

  return {
    billingAddress: data?.billingAddress || {},
    shippingAddress: data?.shippingAddress || {},
    isLoading,
    isError: error,
    mutateAddress: mutate,
  };
};

export default useAddress;
