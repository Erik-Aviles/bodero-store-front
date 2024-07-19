import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export default function useProduct(id) {
  const { data, error } = useSWR(id ? `/api/products/${id}` : null, fetcher);

  return {
    product: data,
    isLoading: !error && !data,
    isError: error,
  };
}
