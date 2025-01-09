import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

const useAddress = () => {
  const { data, error, isLoading } = useSWR(`/api/customers/address`, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  return {
    billingAddress: data?.billingAddress || {},
    shippingAddress: data?.shippingAddress || {},
    isLoading,
    isError: error,
  };
};

export default useAddress;
