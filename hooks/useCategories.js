import { fetcher } from "@/utils/fetcher";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

export default function useCategories(limit) {
  const router = useRouter();
  const { query } = router;
  const queryPage = parseInt(query.page, 10) || 1;
  const [pageCat, setPageCat] = useState(queryPage);

  const apiUrlCategories = `/api/categories/pagination?limit=${limit}&page=${pageCat}`;

  const { data, error, isLoading, mutate } = useSWR(apiUrlCategories, fetcher);

  return {
    categories: data,
    isLoadingCategories: isLoading,
    isErrorCategories: error,
    pageCat,
    setPageCat,
    mutateCategories: mutate,
  };
}
