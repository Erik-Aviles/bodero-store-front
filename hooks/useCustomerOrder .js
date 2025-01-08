import { useMemo } from "react";
import { useCustomerAllOrders } from "./useCustomerAllOrders";

export default function useCustomerOrder(orderNumber) {
  const { orders } = useCustomerAllOrders();
  const shouldFetch = !!orderNumber;

  console.log("orders", orders);
  console.log("orderNumber", shouldFetch);

  // Use useMemo to memoize the filtered order for performance
  const order = useMemo(() => {
    if (!orders || !Array.isArray(orders)) return null;
    return orders.find((order) => order.orderNumber === orderNumber) || null;
  }, [orders, orderNumber]);

  return  order ;
}
