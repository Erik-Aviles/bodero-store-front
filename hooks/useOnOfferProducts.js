import { fetcher } from "@/utils/fetcher";
import filterSearch from "@/utils/filterSearch";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

const useOnOfferProducts = (limit) => {
  const router = useRouter();
  const { query } = router;
  const queryPage = parseInt(query.page, 10);
  const [pages, setPages] = useState(queryPage || 1);

  const { data, error, mutate } = useSWR(
    `/api/products/on-offer?page=${pages}&limit=${limit}`,
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
    onOffetProducts: data?.products,
    totalOnOffetProducts: data?.totalProducts,
    isLoadingOnOffetProducts: !error && !data,
    isErrorOnOffetProducts: error,
    pages,
    setPages,
    handlePageChange,
    handleGoBack,
  };
};

export default useOnOfferProducts;
