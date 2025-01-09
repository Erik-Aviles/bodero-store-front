import { useMemo } from "react";
import { useCustomerAllOrders } from "./useCustomerAllOrders";

export default function useCustomerOrder(orderNumber) {
  const { orders } = useCustomerAllOrders();

  const order = useMemo(() => {
    if (!orders || !Array.isArray(orders)) return null;
    return orders.find((order) => order.orderNumber === orderNumber) || null;
  }, [orders, orderNumber]);

  return  order ;
}
