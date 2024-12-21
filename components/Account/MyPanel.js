import { blue } from '@/lib/colors'
import { customerInfo, recentOrders } from '@/resource/curtomerData'
import Link from 'next/link'
import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { EdithIcon } from '../Icons'

const Section = css`
  line-height: 1.6;
  width: 100%;
`

const Container = styled.div`
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  h2 {
    color: ${blue};
    margin: 0;
  }
`

const InfoSection = styled.div`
  ${Section}
  .header-section {
    display: flex;
    justify-content: space-between;
    color: ${blue};
    h3 {
      margin: 0;
    }
  }
  .addresses-container {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    gap: 15px;
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }
    .addresses-box {
      display: flex;
      flex-direction: column;
      gap: 15px;
      width: 100%;
      max-width: 400px;
      min-width: 200px;
      border: 1px solid #e9ecef;
      padding: 15px;
      border-radius: 8px;
      background-color: #f8f9fa;

      h4 {
        margin: 10px 0;
        font-weight: 300;
        color: ${blue};
        border-bottom: 2px solid #ccc; /* Línea divisoria */
        padding-bottom: 8px;
      }
      div {
        display: flex;
        gap: 10px;
        p {
          margin: 0;
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 100px;
          span {
            font-size: 0.75rem;
            font-weight: 400;
            color: #9199a0;
          }
        }
        @media (max-width: 768px) {
          flex-direction: column;
        }
      }

      @media (max-width: 768px) {
        width: 100%; /* Ocupa todo el ancho en dispositivos móviles */
      }
    }

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
`

const TableSection = styled.div`
  ${Section}
  .header-section {
    display: flex;
    justify-content: space-between;
    color: ${blue};
    h3 {
      margin: 0;
    }
  }
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

const MyPanel = () => {
  const recentOrder = recentOrders.slice(-1)[0]

  return (
    <Container>
      <h2>Bienvenido a tu cuenta</h2>
      <InfoSection>
        <div className='header-section'>
          <h3> Mis Datos </h3>
          <Link
            href='/customer/mi-cuenta?section=perfil'
            title='Editar mis datos'
          >
            <EdithIcon size={22} />
          </Link>
        </div>
        <div className='addresses-container'>
          <div className='addresses-box'>
            <div>
              <p>
                <span>Nombres:</span> {customerInfo?.name || '--'}
              </p>
              <p>
                <span>Alpllidos:</span> {customerInfo?.lastname || '--'}
              </p>
            </div>
            <div>
              <p>
                <span>Email:</span> {customerInfo?.email || '--'}
              </p>
              <p>
                <span>Teléfono:</span> {customerInfo?.phone || '--'}
              </p>
            </div>
            <div>
              <p>
                <span>Documento de identidad:</span>
                {customerInfo?.idDocument || '--'}
              </p>
              <p>
                <span>Fecha de nacimiento:</span>
                {customerInfo?.dateOfBirth || '--'}
              </p>
            </div>
            <div>
              <p>
                <span>Genero:</span> {customerInfo?.gender || '--'}
              </p>
            </div>
          </div>
        </div>
      </InfoSection>

      <TableSection>
        <div className='header-section'>
          <h3>Mis Pedidos Recientes</h3>
          <Link
            href='/customer/mi-cuenta?section=pedidos'
            title='Ir a mis pedidos'
          >
            Ver todos
          </Link>
        </div>
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
              <tr>
                <td>{recentOrder.orderNumber || '--'}</td>
                <td>{recentOrder.date || '--'}</td>
                <td>{recentOrder.address || '--'}</td>
                <td>{recentOrder.total || '--'}</td>
                <td>{recentOrder.status || '--'}</td>
                <td>
                  <button>Ver</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </TableSection>

      <InfoSection>
        <div className='header-section'>
          <h3>Mis Direcciones</h3>
          <Link
            href='/customer/mi-cuenta?section=direcciones'
            title='Editar mis direcciones'
          >
            <EdithIcon size={22} />
          </Link>
        </div>
        <div className='addresses-container'>
          <div className='addresses-box'>
            <h4>Dirección de Facturación </h4>
            <div>
              <p>
                <span>Nombres</span>
                {customerInfo?.billingAddress?.name || '--'}
              </p>
              <p>
                <span>Alpllidos</span>
                {customerInfo?.billingAddress?.lastname || '--'}
              </p>
            </div>
            <div>
              <p>
                <span>Dirección</span>
                {customerInfo?.billingAddress?.address || '--'}
              </p>
            </div>
            <div>
              <p>
                <span>Provincia:</span>
                {customerInfo?.billingAddress?.province?.name || '--'}
              </p>
            </div>
            <div>
              <p>
                <span>Cantón:</span>
                {customerInfo?.billingAddress?.canton || '--'}
              </p>
            </div>

            <div>
              <p>
                <span>País:</span>
                {customerInfo?.billingAddress?.country?.name || '--'}
              </p>
            </div>
            <div>
              <p>
                <span>Teléfono:</span>
                {customerInfo?.billingAddress?.phone || '--'}
              </p>
            </div>
          </div>
          <div className='addresses-box'>
            <h4>Dirección de Envío </h4>
            <div>
              <p>
                <span>Nombres</span>
                {customerInfo?.shippingAddress?.name || '--'}
              </p>
              <p>
                <span>Alpllidos</span>
                {customerInfo?.shippingAddress?.lastname || '--'}
              </p>
            </div>
            <div>
              <p>
                <span>Dirección</span>
                {customerInfo?.shippingAddress?.address || '--'}
              </p>
            </div>
            <div>
              <p>
                <span>Provincia:</span>
                {customerInfo?.shippingAddress?.province.name || '--'}
              </p>
            </div>
            <div>
              <p>
                <span>Cantón:</span>
                {customerInfo?.shippingAddress?.canton || '--'}
              </p>
            </div>

            <div>
              <p>
                <span>País:</span>
                {customerInfo?.shippingAddress?.country?.name || '--'}
              </p>
            </div>
            <div>
              <p>
                <span>Teléfono:</span>
                {customerInfo?.shippingAddress?.phone || '--'}
              </p>
            </div>
          </div>
        </div>
      </InfoSection>
    </Container>
  )
}

export default MyPanel
