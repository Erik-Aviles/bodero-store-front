import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { Loading } from "@/components/Loading";

const useCustomerAddress = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/customers/addresses`,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );
  
  if(isLoading) return <Loading />

  return {
    billingAddress: data ? data?.billingAddress : {},
    shippingAddress: data ?  data?.shippingAddress : {},
    isLoading,
    isError: !!error,
    mutateAddress: mutate,
  };
};

export default useCustomerAddress;
