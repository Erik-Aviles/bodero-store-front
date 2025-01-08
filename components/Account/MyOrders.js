import React from "react";
import {
  ComponenteLink,
  Container,
  ContentEmpty,
  ScrollContainer,
  StatusText,
  TD,
  TDnowrap,
  Table,
  TitleH2,
} from "../stylesComponents/ComponentAccount";
import BackButton from "../buttonComponents/BackButton";
import { handleGoBack } from "@/hooks/useHandleGoBack";
import { formatDateToEcuador } from "@/utils/formats/formatDateToEcuador";
import formatPrice from "@/utils/formats/formatPrice";
import { useCustomerAllOrders } from "@/hooks/useCustomerAllOrders";
import { calcularQuantity, calcularTotal } from "@/utils/generators/calculateTotals";


const MyOrders = () => {
  const { orders } = useCustomerAllOrders();

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
              <th>Pago total</th>
              <th>Cant. Productos</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id}>
                <TDnowrap>{order?.orderNumber || ""}</TDnowrap>
                <td>{formatDateToEcuador(order.createdAt) || ""}</td>
                <TDnowrap>
                  {`${order.streetAddress}, ${order.city}, ${order.province}, ${order.country}.` ||
                    ""}
                </TDnowrap>
                <td>{ formatPrice(calcularTotal(order?.line_items)) || ""}</td>
                <td>{calcularQuantity(order?.line_items)  || ""}</td>
                <td>
                  {(
                    <StatusText $status={order?.status}>
                      {order?.status || ""}
                    </StatusText>
                  ) || ""}
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

        {!orders && (
          <ContentEmpty>
            <p>No tienes pedidos</p>
          </ContentEmpty>
        )}
      </ScrollContainer>
    </Container>
  );
};

export default MyOrders;
