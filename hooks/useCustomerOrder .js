import { useCustomer } from '@/context/CustomerProvider'
import { useMemo } from 'react'

export const useCustomerOrder = (orderNumber) => {
  const { customer, isLoading, error } = useCustomer()

  // Filtrar el pedido específico por orderNumber
  const order = useMemo(() => {
    if (!customer?.orders || !orderNumber) return null
    return customer.orders.find((order) => order.orderNumber === orderNumber)
  }, [customer?.orders, orderNumber])

  return { order, isLoading, error }
}
