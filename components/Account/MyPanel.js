import React from 'react'
import styled from 'styled-components'
import { blue } from '@/lib/colors'
import { EdithIcon } from '../Icons'
import { customerInfo } from '@/resource/curtomerData'
import {
  ComponenteLink,
  Container,
  Article,
  SectionTitle,
  StatusText,
  TitleH2,
  Wrapper,
  Table,
  ScrollContainer,
  TD,
} from '../stylesComponents/ComponentAccount'
import BackButton from '../buttonComponents/BackButton'
import { handleGoBack } from '@/utils/handleGoBack'

const InfoSection = styled.section`
  line-height: 1.6;
  width: 100%;
  margin-bottom: 20px;
  .header-section {
    display: flex;
    gap: 20px;
    align-items: center;
    color: ${blue};
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const MyPanel = () => {
  const recentOrder = customerInfo.orders.slice(-1)[0]

  const subtotal = recentOrder.line_items.reduce(
    (acc, item) => acc + item.quantity * item.info_order.product_data.price,
    0
  )
  const iva = (subtotal * 0.15).toFixed(2)
  const total = (subtotal + parseFloat(iva)).toFixed(2)

  return (
    <Container>
      <header>
        <BackButton onClick={handleGoBack} />
        <TitleH2>Bienvenido a tu cuenta</TitleH2>
      </header>
      <InfoSection>
        <div className='header-section'>
          <SectionTitle> Mis Datos </SectionTitle>
          <ComponenteLink
            href='/customer/mi-cuenta/perfil'
            title='Editar mis datos'
          >
            <EdithIcon size={22} />
          </ComponenteLink>
        </div>
        <Wrapper>
          <Article>
            <p>
              <span>Nombres</span>
              {customerInfo?.name || '--'}
            </p>
            <p>
              <span>Apellidos</span>
              {customerInfo?.lastname || '--'}
            </p>
            <p>
              <span>Email:</span> {customerInfo?.email || '--'}
            </p>
            <p>
              <span>Teléfono:</span> {customerInfo?.phone || '--'}
            </p>

            <p>
              <span>Documento de identidad:</span>
              {customerInfo?.idDocument || '--'}
            </p>
            <p>
              <span>Fecha de nacimiento:</span>
              {customerInfo?.dateOfBirth || '--'}
            </p>

            <p>
              <span>Genero:</span> {customerInfo?.gender || '--'}
            </p>
          </Article>
        </Wrapper>
      </InfoSection>

      <InfoSection>
        <div className='header-section'>
          <SectionTitle>Mis Pedidos Recientes</SectionTitle>
          <ComponenteLink
            href='/customer/mi-cuenta/pedidos'
            title='Ir a mis pedidos'
          >
            Ver todos
          </ComponenteLink>
        </div>
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
              <tr>
                <td>{recentOrder?.orderNumber || '--'}</td>
                <td>{recentOrder?.createdAt || '--'}</td>
                <TD>
                  {`${recentOrder.streetAddress}, ${recentOrder.city}, ${recentOrder.province}, ${recentOrder.country}.` ||
                    '--'}
                </TD>
                <td>{total || '--'}</td>
                <td>
                  <StatusText status={recentOrder?.status}>
                    {recentOrder?.status || '--'}
                  </StatusText>
                </td>
                <td>
                  <ComponenteLink
                    href={`/customer/mi-cuenta/pedidos?pedido=${recentOrder?.orderNumber}`}
                  >
                    Ver
                  </ComponenteLink>
                </td>
              </tr>
            </tbody>
          </Table>
        </ScrollContainer>
      </InfoSection>

      <InfoSection>
        <div className='header-section'>
          <SectionTitle>Mis Direcciones</SectionTitle>
          <ComponenteLink
            href='/customer/mi-cuenta/direcciones'
            title='Editar mis direcciones'
          >
            <EdithIcon size={22} />
          </ComponenteLink>
        </div>
        <Wrapper>
          <Article>
            <SectionTitle>Dirección de Facturación </SectionTitle>
            <p>
              <span>Nombres</span>
              {`${customerInfo?.billingAddress?.name} ${customerInfo?.billingAddress?.lastname}` ||
                '--'}
            </p>

            <p>
              <span>Dirección</span>
              {customerInfo?.billingAddress?.address || '--'}
            </p>

            <p>
              <span>Provincia:</span>
              {customerInfo?.billingAddress?.province?.name || '--'}
            </p>

            <p>
              <span>Cantón:</span>
              {customerInfo?.billingAddress?.canton || '--'}
            </p>

            <p>
              <span>País:</span>
              {customerInfo?.billingAddress?.country?.name || '--'}
            </p>

            <p>
              <span>Teléfono:</span>
              {customerInfo?.billingAddress?.phone || '--'}
            </p>
          </Article>
          <Article>
            <SectionTitle>Dirección de Envío </SectionTitle>
            <p>
              <span>Nombres</span>
              {`${customerInfo?.shippingAddress?.name} ${customerInfo?.shippingAddress?.lastname}` ||
                '--'}
            </p>
            <p>
              <span>Dirección</span>
              {customerInfo?.shippingAddress?.address || '--'}
            </p>
            <p>
              <span>Provincia:</span>
              {customerInfo?.shippingAddress?.province.name || '--'}
            </p>
            <p>
              <span>Cantón:</span>
              {customerInfo?.shippingAddress?.canton || '--'}
            </p>
            <p>
              <span>País:</span>
              {customerInfo?.shippingAddress?.country?.name || '--'}
            </p>
            <p>
              <span>Teléfono:</span>
              {customerInfo?.shippingAddress?.phone || '--'}
            </p>
          </Article>
        </Wrapper>
      </InfoSection>
    </Container>
  )
}

export default MyPanel
