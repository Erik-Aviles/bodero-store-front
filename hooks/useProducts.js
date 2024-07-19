import { useState, useEffect } from "react";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import filterSearch from "@/utils/filterSearch";
import { useRouter } from "next/router";

const useProducts = () => {
  const router = useRouter();
  const { query } = router;
  const queryPage = parseInt(query.page, 10);
  const [pages, setPages] = useState(queryPage || 1);
  const [limit] = useState(20);

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `/api/products?page=${pages}&limit=${limit}`,
    fetcher
  );

  const handlePageChange = (newPage) => {
    filterSearch({ router, page: newPage });
    setPages(newPage);
    mutate();
  };

  const handleGoBack = () => {
    if (query.page > 1) {
      const newPage = parseInt(pages - 1);
      if (newPage >= 1) {
        setPages(newPage);
        mutate();
        filterSearch({ router, page: newPage });
      }
    }
    router.back();
  };

  return {
    data,
    error,
    isLoading,
    isValidating,
    pages,
    setPages,
    mutate,
    handleGoBack,
    handlePageChange,
  };
};

export default useProducts;
