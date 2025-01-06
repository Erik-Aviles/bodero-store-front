import { useSession } from 'next-auth/react'
import { useMemo } from 'react'

export const useCustomerOrder = (orderNumber) => {
    const { data: session, status, update } = useSession();
    console.log("session", session?.user);
    const customer = session?.user;

  // Filtrar el pedido específico por orderNumber
  const order = useMemo(() => {
    if (!customer?.orders || !orderNumber) return null
    return customer.orders.find((order) => order.orderNumber === orderNumber)
  }, [customer?.orders, orderNumber])

  return { order, isLoading, error }
}
