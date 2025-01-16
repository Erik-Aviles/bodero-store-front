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
import { useHandleGoBack } from "@/hooks/useHandleGoBack";
import { formatDateToEcuador } from "@/utils/formats/formatDateToEcuador";
import formatPrice from "@/utils/formats/formatPrice";
import { useCustomerAllOrders } from "@/hooks/useCustomerAllOrders";
import {
  calcularQuantity,
  calcularTotal,
} from "@/utils/generators/calculateTotals";

const MyOrders = () => {
  const handleGoBack = useHandleGoBack();
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
              <th>Cant</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id}>
                <TDnowrap>{order?.orderNumber || ""}</TDnowrap>
                <td>{formatDateToEcuador(order.createdAt) || ""}</td>
                <TD>
                  {`${order.streetAddress}, ${order.city}, ${order.province}, ${order.country}.` ||
                    ""}
                </TD>
                <td>{formatPrice(calcularTotal(order?.line_items)) || ""}</td>
                <td>{calcularQuantity(order?.line_items) || ""}</td>
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

        {!orders?.length && (
          <ContentEmpty>
            <p>No tienes pedidos para mostrar</p>
          </ContentEmpty>
        )}
      </ScrollContainer>
    </Container>
  );
};

export default MyOrders;
