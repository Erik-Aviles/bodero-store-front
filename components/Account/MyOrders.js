import React from 'react'
import styled from 'styled-components'
import { blue } from '@/lib/colors'
import { recentOrders } from '@/resource/curtomerData'

const Container = styled.div`
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  h2 {
    color: ${blue};
    margin: 0;
  }
`

const TableSection = styled.div`
  line-height: 1.6;
  width: 100%;

  .table-container {
    overflow-x: auto;
    margin-top: 10px;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    width: 100%;

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: calc(100vh - 290px);
      @media (max-width: 768px) {
        min-width: 700px;
      }
    }

    th,
    td {
      font-size: 0.9rem;
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #f8f9fa;
      color: ${blue};
      font-weight: 400;
    }

    tr:hover {
      background-color: #f1f1f1;
    }
  }
`

const MyOrders = () => {
  return (
    <Container>
      <h2>Todos mis pedidos</h2>
      <TableSection>
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>N° Pedido</th>
                <th>Fecha</th>
                <th>Enviar a </th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders?.map((order) => (
                <tr key={order.id}>
                  <td>{order.orderNumber || '--'}</td>
                  <td>{order.date || '--'}</td>
                  <td>{order.address || '--'}</td>
                  <td>{order.total || '--'}</td>
                  <td>{order.status || '--'}</td>
                  <td>
                    <button>Ver</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableSection>
    </Container>
  )
}

export default MyOrders
