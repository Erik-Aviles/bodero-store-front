import React from 'react'
import { useRouter } from 'next/router'
import { customerInfo } from '@/resource/curtomerData'
import BackButton from '../buttonComponents/BackButton'
import { capitalize } from '@/utils/capitalize'
import {
  Container,
  Article,
  Table,
  ScrollContainer,
  SectionTitle,
  StatusText,
  TitleH2,
  Wrapper,
  TD,
} from '../stylesComponents/ComponentAccount'
import { handleGoBack } from '@/utils/handleGoBack'

const Order = () => {
  const router = useRouter()
  const { pedido } = router.query

  const order = customerInfo?.orders?.find(
    (o) => o.orderNumber === parseInt(pedido)
  )

  if (!order) {
    return (
      <Container>
        <BackButton onClick={handleGoBack} />
        <TitleH2>Pedido no encontrado</TitleH2>
        <p>Por favor, verifica el enlace o selecciona otro pedido.</p>
      </Container>
    )
  }

  const subtotal = order.line_items.reduce(
    (acc, item) => acc + item.quantity * item.info_order.product_data.price,
    0
  )
  const iva = (subtotal * 0.15).toFixed(2)
  const total = (subtotal + parseFloat(iva)).toFixed(2)

  return (
    <Container>
      <header>
        <BackButton onClick={handleGoBack} />
        <TitleH2>Pedido N° {order.orderNumber}</TitleH2>
      </header>
      <Wrapper>
        <Article>
          <SectionTitle>Datos generales</SectionTitle>
          <p>
            <span>Fecha del pedido:</span> {order.createdAt}
          </p>
          <p>
            <span>Recibe:</span> {capitalize(order.name)}{' '}
            {capitalize(order.lastname)}
          </p>
          <p>
            <span>Enviar a:</span>{' '}
            {`${order.streetAddress}, ${order.city}, ${order.province}, ${order.country}.`}
          </p>
          <p>
            <span>Estado:</span>{' '}
            <StatusText status={order.status}>{order.status}</StatusText>
          </p>
        </Article>
        <Article>
          <SectionTitle>Forma de pago</SectionTitle>
          <p>
            <span>Targeta de credito:</span> xxxx 7306
          </p>
          <p>
            <span>Diferido:</span>
            12 meses
          </p>
          <p>
            <span>Autorización:</span> 625091
          </p>
          <p>
            <span>Adquiridor:</span> DataFast
          </p>
        </Article>
        <Article>
          <SectionTitle>Resumen</SectionTitle>
          <p>
            <span>Subtotal:</span> ${subtotal.toFixed(2)}
          </p>
          <p>
            <span>Impuestos (15%):</span> ${iva}
          </p>
          <p>
            <span>Total a pagar:</span> ${total}
          </p>
        </Article>
      </Wrapper>
      <SectionTitle>Artículos pedidos</SectionTitle>
      <ScrollContainer>
        <Table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre del Producto</th>
              <th>Marca</th>
              <th>Cant.</th>
              <th>P. Unit.</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.line_items.map((item, index) => (
              <tr key={index}>
                <td>{item.info_order.product_data.code}</td>
                <TD>{item.info_order.product_data.name}</TD>
                <td>{item.info_order.product_data.brand}</td>
                <td>{item.quantity}</td>
                <td>{item.info_order.product_data.price.toFixed(2)} </td>
                <td>{item.info_order.unit_amount.toFixed(2)} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollContainer>
    </Container>
  )
}

export default Order
