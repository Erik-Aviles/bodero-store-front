import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useData() {
  const { data, error, isLoading } = useSWR("/api/company", fetcher);

  const company = data && data[0];

  return {
    company,
    error,
    isLoading,
  };
}
