import { fetcher } from "@/utils/fetcher";
import React, { createContext, memo, useContext, useMemo } from "react";
import useSWR from "swr";

const CustomerContext = createContext();

// eslint-disable-next-line react/display-name
export const CustomerProvider = memo(({ children }) => {
  // const customerId = "6777067a14d2d4507fdfd826";
  const customerId = "67784ac87a1b1c9ece954ff3";
  // Usa SWR para manejar la caché y actualización automática
  const {
    data: customer,
    error,
    isLoading,
  } = useSWR(customerId ? `/api/customers/${customerId}` : null, fetcher, {
    revalidateOnFocus: false, // Evita recargar datos al cambiar de pestaña
    dedupingInterval: 10000, // Reduce solicitudes duplicadas en 10s
  });

  const value = useMemo(
    () => ({ customer, isLoading, error }),
    [customer, isLoading, error] // Memoriza solo si cambian estos valores
  );

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
});

export const useCustomer = () => useContext(CustomerContext);
