import React from 'react'
import styled from 'styled-components'
import { blue } from '@/lib/colors'
import { customerInfo, recentOrders } from '@/resource/curtomerData'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  ComponenteLink,
  Container,
  ScrollContainer,
  StatusText,
  TD,
  Table,
  TitleH2,
} from '../stylesComponents/ComponentAccount'
import BackButton from '../buttonComponents/BackButton'
import { handleGoBack } from '@/utils/handleGoBack'

const TableSection = styled.div`
  line-height: 1.6;
  width: 100%;

  .table-container {
    overflow-x: auto;
    margin-top: 10px;
    border: 1px solid #e9ecef;

    table {
      width: 100%;
      font-size: 0.8rem;
      border-collapse: collapse;
      text-transform: capitalize;

      min-width: calc(100vh - 290px);
      @media (max-width: 768px) {
        min-width: 700px;
      }
    }

    th,
    td {
      max-width: 400px;
      padding: 10px;
      border: 1px solid #e9ecef;
    }

    th {
      white-space: nowrap;
      background-color: ${blue};
      color: #fff;
      text-align: left;
      font-weight: 400;
    }

    tr:hover {
      background-color: #f1f1f1;
      color: blue;
    }
    tbody tr:nth-child(even) {
      background-color: #f8f9fa;
    }
  }
`

const MyOrders = () => {
  const subtotal = customerInfo?.orders?.line_items?.reduce(
    (acc, item) => acc + item.quantity * item.info_order.product_data.price,
    0
  )
  const iva = (subtotal * 0.15).toFixed(2)
  const total = (subtotal + parseFloat(iva)).toFixed(2)
  return (
    <Container>
      <header>
        <BackButton onClick={handleGoBack} />
        <TitleH2>Todos mis pedidos</TitleH2>
      </header>
      <ScrollContainer>
        <Table>
          <thead>
            <tr>
              <th>N° Pedido</th>
              <th>Fecha de pedido</th>
              <th>Dirección de envío </th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {customerInfo?.orders?.map((order) => (
              <tr key={order.id}>
                <td>{order.orderNumber || '--'}</td>
                <td>{order.createdAt || '--'}</td>
                <TD>
                  {`${order.streetAddress}, ${order.city}, ${order.province}, ${order.country}.` ||
                    '--'}
                </TD>
                <td>{total || '--'}</td>
                <td>
                  {(
                    <StatusText status={order?.status}>
                      {order?.status || '--'}
                    </StatusText>
                  ) || '--'}
                </td>
                <td>
                  <ComponenteLink
                    href={`/customer/mi-cuenta/pedidos?pedido=${order?.orderNumber}`}
                  >
                    Ver
                  </ComponenteLink>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollContainer>
    </Container>
  )
}

export default MyOrders
