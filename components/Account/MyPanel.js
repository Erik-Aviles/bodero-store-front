import React from "react";
import styled from "styled-components";
import { blue } from "@/lib/colors";
import { AddIcon, EdithIcon } from "../Icons";
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
  ContentEmpty,
} from "../stylesComponents/ComponentAccount";
import BackButton from "../buttonComponents/BackButton";
import { useHandleGoBack } from "@/hooks/useHandleGoBack";
import { useSession } from "next-auth/react";

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
`;
const FlexHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  color: ${blue};
`;

const MyPanel = () => {
  const handleGoBack = useHandleGoBack();
  const { data: session, status, update } = useSession();
  console.log("session", session?.user);
  const customer = session?.user;
  console.log(customer);

  const recentOrder = customer?.orders?.slice(-1)[0];

  const subtotal = recentOrder?.line_items.reduce(
    (acc, item) => acc + item.quantity * item.info_order.product_data.price,
    0
  );

  const iva = (subtotal * 0.15).toFixed(2);
  const total = (subtotal + parseFloat(iva)).toFixed(2);

  return (
    <Container>
      <header>
        <BackButton onClick={handleGoBack} />
        <TitleH2>Bienvenido a tu cuenta</TitleH2>
      </header>
      <InfoSection>
        <FlexHeader>
          <SectionTitle> Mis Datos </SectionTitle>
          <ComponenteLink
            href="/customer/mi-cuenta/perfil"
            title="Editar mi información"
          >
            <EdithIcon size={22} />
          </ComponenteLink>
        </FlexHeader>
        <Wrapper>
          {customer && (
            <Article>
              <p>
                <span>Nombres</span>
                {customer?.name || "--"}
              </p>
              <p>
                <span>Apellidos</span>
                {customer?.lastname || "--"}
              </p>
              <p>
                <span>Email:</span> {customer?.email || "--"}
              </p>
              <p>
                <span>Teléfono:</span> {customer?.phone || "--"}
              </p>

              <p>
                <span>Documento de identidad:</span>
                {customer?.idDocument || "--"}
              </p>
              <p>
                <span>Fecha de nacimiento:</span>
                {customer?.dateOfBirth || "--"}
              </p>

              <p>
                <span>Genero:</span> {customer?.gender || "--"}
              </p>
            </Article>
          )}
        </Wrapper>
      </InfoSection>

      <InfoSection>
        <FlexHeader>
          <SectionTitle>Mis Pedidos Recientes</SectionTitle>

          <ComponenteLink
            href="/customer/mi-cuenta/pedidos"
            title="Ir a mis pedidos"
          >
            Ver todos
          </ComponenteLink>
        </FlexHeader>
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
              {customer?.orders?.length !== 0 && (
                <tr>
                  <td>{recentOrder?.orderNumber || "--"}</td>
                  <td>{recentOrder?.createdAt || "--"}</td>
                  <TD>
                    {recentOrder
                      ? `${recentOrder?.streetAddress}, ${recentOrder?.city}, ${recentOrder?.province}, ${recentOrder?.country}.`
                      : "--"}
                  </TD>
                  <td>{!total || "--"}</td>
                  <td>
                    <StatusText $status={recentOrder?.status}>
                      {recentOrder?.status || "--"}
                    </StatusText>
                  </td>
                  <td>
                    {recentOrder && (
                      <ComponenteLink
                        href={`/customer/mi-cuenta/pedidos?pedido=${recentOrder?.orderNumber}`}
                      >
                        Ver
                      </ComponenteLink>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          {!customer?.orders?.length && (
            <ContentEmpty>
              <p>No tienes pedidos</p>
            </ContentEmpty>
          )}
        </ScrollContainer>
      </InfoSection>

      <InfoSection>
        <div className="header-section">
          <SectionTitle>Mis Direcciones</SectionTitle>
          <ComponenteLink
            href="/customer/mi-cuenta/direcciones"
            title="Editar mis direcciones"
          >
            Ver todos
          </ComponenteLink>
        </div>
        <Wrapper>
          <Article>
            <FlexHeader>
              <SectionTitle>Dirección de Facturación </SectionTitle>
              {!customer?.billingAddress ? (
                <ComponenteLink
                  href="/customer/mi-cuenta/direcciones"
                  title="Agregar dirección de facturación"
                >
                  <AddIcon size={22} />
                </ComponenteLink>
              ) : (
                <ComponenteLink
                  href="/customer/mi-cuenta/direcciones"
                  title="Editar mi dirección de facturación"
                >
                  <EdithIcon size={22} />
                </ComponenteLink>
              )}
            </FlexHeader>
            {customer?.billingAddress ? (
              <>
                <p>
                  <span>Nombres</span>
                  {customer?.billingAddress?.name ||
                  customer?.billingAddress?.lastname
                    ? `${customer?.billingAddress?.name} ${customer?.billingAddress?.lastname}`
                    : "--"}
                </p>

                <p>
                  <span>Dirección</span>
                  {customer?.billingAddress?.streetAddress || "--"}
                </p>

                <p>
                  <span>Provincia:</span>
                  {customer?.billingAddress?.province?.name || "--"}
                </p>

                <p>
                  <span>Cantón:</span>
                  {customer?.billingAddress?.canton || "--"}
                </p>

                <p>
                  <span>País:</span>
                  {customer?.billingAddress?.country?.name || "--"}
                </p>
                <p>
                  <span>Postal:</span>
                  {customer?.billingAddress?.postal || "--"}
                </p>

                <p>
                  <span>Teléfono:</span>
                  {customer?.billingAddress?.phone || "--"}
                </p>
              </>
            ) : (
              <ContentEmpty>
                <p>No tienes dirección de facturación guardado</p>
              </ContentEmpty>
            )}
          </Article>
          <Article>
            <FlexHeader>
              <SectionTitle>Dirección de Envío </SectionTitle>
              {!customer?.shippingAddress ? (
                <ComponenteLink
                  href="/customer/mi-cuenta/direcciones"
                  title="Agregar dirección de envío"
                >
                  <AddIcon size={22} />
                </ComponenteLink>
              ) : (
                <ComponenteLink
                  href="/customer/mi-cuenta/perfil"
                  title="Editar mi dirección de envío"
                >
                  <EdithIcon size={22} />
                </ComponenteLink>
              )}
            </FlexHeader>
            {customer?.shippingAddress ? (
              <>
                <p>
                  <span>Nombres</span>
                  {customer?.shippingAddress?.name ||
                  customer?.shippingAddress?.lastname
                    ? `${customer?.shippingAddress?.name} ${customer?.shippingAddress?.lastname}`
                    : "--"}
                </p>
                <p>
                  <span>Dirección</span>
                  {customer?.shippingAddress?.streetAddress || "--"}
                </p>
                <p>
                  <span>Provincia:</span>
                  {customer?.shippingAddress?.province?.name || "--"}
                </p>
                <p>
                  <span>Cantón:</span>
                  {customer?.shippingAddress?.canton || "--"}
                </p>
                <p>
                  <span>País:</span>
                  {customer?.shippingAddress?.country?.name || "--"}
                </p>
                <p>
                  <span>Postal:</span>
                  {customer?.shippingAddress?.postal || "--"}
                </p>
                <p>
                  <span>Teléfono:</span>
                  {customer?.shippingAddress?.phone || "--"}
                </p>
              </>
            ) : (
              <ContentEmpty>
                <p>No tienes dirección de envio guardado</p>
              </ContentEmpty>
            )}
          </Article>
        </Wrapper>
      </InfoSection>
    </Container>
  );
};

export default MyPanel;
