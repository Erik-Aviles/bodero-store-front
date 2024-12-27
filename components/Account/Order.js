import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { customerInfo, recentOrders } from '@/resource/curtomerData'
import BackButton from '../buttonComponents/BackButton'
import { blue } from '@/lib/colors'

const Container = styled.div`
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  header {
    display: flex;
    align-items: center;
    gap: 10px;
    h2 {
      color: ${blue};
      margin: 0;
    }
  }
`

const OrderDetails = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 15px;
  background-color: #f8f9fa;
`

const Order = () => {
  const router = useRouter()
  const { pedido } = router.query

  const order = customerInfo?.orders?.find(
    (o) => o.orderNumber === parseInt(pedido)
  )
  const handleGoBack = (e) => {
    e.preventDefault()
    router.back()
  }

  if (!order) {
    return (
      <Container>
        <BackButton onClick={handleGoBack} />
        <h2>Pedido no encontrado</h2>
        <p>Por favor, verifica el enlace o selecciona otro pedido.</p>
      </Container>
    )
  }

  return (
    <Container>
      <header>
        <BackButton onClick={handleGoBack} />
        <h2>Detalles del Pedido #{order.orderNumber}</h2>
      </header>
      <OrderDetails>
        <p>
          <strong>Fecha:</strong> {order.date}
        </p>
        <p>
          <strong>Enviar a:</strong> {order.address}
        </p>
        <p>
          <strong>Total:</strong> {order.total}
        </p>
        <p>
          <strong>Estado:</strong> {order.status}
        </p>
      </OrderDetails>
    </Container>
  )
}

export default Order
