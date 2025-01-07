import React from "react";
import {
  ComponenteLink,
  Container,
  ContentEmpty,
  ScrollContainer,
  StatusText,
  TD,
  Table,
  TitleH2,
} from "../stylesComponents/ComponentAccount";
import BackButton from "../buttonComponents/BackButton";
import { handleGoBack } from "@/hooks/useHandleGoBack";
import { useSession } from "next-auth/react";

const MyOrders = () => {
  const { data: session, status, update } = useSession();
  console.log("session", session?.user);
  const customer = session?.user;
  console.log("customer", customer?.orders?.length);

  const subtotal = customer?.orders?.line_items?.reduce(
    (acc, item) => acc + item.quantity * item.info_order.product_data.price,
    0
  );
  const iva = (subtotal * 0.15).toFixed(2);
  const total = (subtotal + parseFloat(iva)).toFixed(2);

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
            {customer?.orders?.map((order) => (
              <tr key={order._id}>
                <td>{order.orderNumber || ""}</td>
                <td>{order.createdAt || ""}</td>
                <TD>
                  {`${order.streetAddress}, ${order.city}, ${order.province}, ${order.country}.` ||
                    ""}
                </TD>
                <td>{total || ""}</td>
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

        <ContentEmpty>
          <p>No tienes pedidos</p>
        </ContentEmpty>
      </ScrollContainer>
    </Container>
  );
};

export default MyOrders;
