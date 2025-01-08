import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

export const useCustomerAllOrders = () => {
  // Llamada a la API con SWR
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/customers/orders", fetcher, {
    revalidateOnFocus: false, // No volver a validar datos al recuperar el foco
    shouldRetryOnError: false, // No reintentar automáticamente en caso de error
  });

  // Retorna los datos y estados necesarios
  return {
    orders: data?.orders || [], // Devuelve un array vacío si no hay datos
    isLoading,                  // Estado de carga
    isError: !!error,           // Estado de error (convertido a booleano)
    mutate,                     // Función para refrescar datos manualmente
  };
};