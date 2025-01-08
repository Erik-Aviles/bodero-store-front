import React from "react";
import BackButton from "../buttonComponents/BackButton";
import { capitalize } from "@/utils/formats/capitalize";
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
} from "../stylesComponents/ComponentAccount";
import { useHandleGoBack } from "@/hooks/useHandleGoBack";
import useCustomerOrder from "@/hooks/useCustomerOrder ";
import { formatDateToEcuador } from "@/utils/formats/formatDateToEcuador";
import { calcularTotal } from "@/utils/generators/calculateTotals";
import formatPrice from "@/utils/formats/formatPrice";

const Order = ({ pedido }) => {
  const handleGoBack = useHandleGoBack();
  console.log("pedido", pedido);
  const order = useCustomerOrder(pedido);
  console.log("order", order);

  if (!order) {
    return (
      <Container>
        <BackButton onClick={handleGoBack} />
        <TitleH2>Pedido no encontrado</TitleH2>
        <p>Por favor, verifica el enlace o selecciona otro pedido.</p>
      </Container>
    );
  }
  const total = calcularTotal(order.line_items);

  const iva = total * 0.15;
  // Calcular el restante
  const subtotal = total - iva;

  return (
    <Container>
      <header>
        <BackButton onClick={handleGoBack} />
        <TitleH2>Pedido N° {order?.orderNumber}</TitleH2>
      </header>
      <Wrapper>
        <Article>
          <SectionTitle>Datos generales</SectionTitle>
          <p>
            <span>Fecha del pedido:</span>{" "}
            {formatDateToEcuador(order?.createdAt)}
          </p>
          <p>
            <span>Recibe:</span> {capitalize(order?.name)}{" "}
            {capitalize(order?.lastname)}
          </p>
          <p>
            <span>Enviar a:</span>{" "}
            {`${order?.streetAddress}, ${order?.city}, ${order?.province}, ${order?.country}.`}
          </p>
          <p>
            <span>Estado:</span>
            <StatusText $status={order?.status}>{order?.status}</StatusText>
          </p>
        </Article>
        <Article>
          <SectionTitle>Metodos de pago</SectionTitle>
          <p>
            <span>Targeta de credito:</span> {order?.paymentMethod?.cardNumber}
            {order?.paymentMethod?.cardIcon}
          </p>
          <p>
            <span>Diferido:</span>
            12 meses
          </p>
          <p>
            <span>Autorización:</span>
            {order?.paymentMethod?.authorizationNumber}
          </p>
          <p>
            <span>Adquiridor:</span> {order?.paymentMethod?.acquirerName}
          </p>
        </Article>
        <Article>
          <SectionTitle>Resumen</SectionTitle>
          <p>
            <span>Subtotal:</span>
            {formatPrice(subtotal)}
          </p>
          <p>
            <span>Impuestos (15%):</span> {formatPrice(iva)}
          </p>
          <p>
            <span>Total a pagar:</span>
            {formatPrice(total)}
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
            {order?.line_items &&
              order.line_items.map((item, index) => (
                <tr key={index}>
                  <td>{item.info_order.product_data.code}</td>
                  <TD>{item.info_order.product_data.name}</TD>
                  <td>{item.info_order.product_data.brand}</td>
                  <td>{item.quantity}</td>
                  <td>{item.info_order.product_data.price.toFixed(2)}</td>
                  <td>{item.info_order.unit_amount.toFixed(2)}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </ScrollContainer>
    </Container>
  );
};

export default Order;
