import React, { useEffect, useState } from "react";
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
  TDnowrap,
} from "../stylesComponents/ComponentAccount";
import BackButton from "../buttonComponents/BackButton";
import { useHandleGoBack } from "@/hooks/useHandleGoBack";
import { capitalize } from "@/utils/formats/capitalize";
import { formatDateToEcuador } from "@/utils/formats/formatDateToEcuador";
import { capitalizeWords } from "@/utils/formats/capitalizeWords";
import { useCustomerAllOrders } from "@/hooks/useCustomerAllOrders";
import { calcularTotal } from "@/utils/generators/calculateTotals";
import formatPrice from "@/utils/formats/formatPrice";
import useAddress from "@/hooks/useAddress";
import { loadStatesAndCities } from "@/utils/loadStatesAndCities";
import { countries } from "@/resource/curtomerData";
import { useCustomer } from "@/hooks/useCustomer";
import { format } from "date-fns";

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
  const { orders } = useCustomerAllOrders();
  const { billingAddress, shippingAddress } = useAddress();
  const { customer } = useCustomer();

  const recentOrder = orders?.slice(-1)[0];

  // Estados y ciudades específicos para cada dirección
  const [states, setStates] = useState({
    billingAddress: [],
    shippingAddress: [],
  });

  useEffect(() => {
    const { statesData } = loadStatesAndCities(countries);
    setStates(statesData);
  }, []);

  const getProvinceName = (country, provinceCode) =>
    states[country]?.find((p) => p.isoCode === provinceCode)?.name;

  const provinceBillingAddress = getProvinceName(
    billingAddress?.country,
    billingAddress?.province
  );
  const provinceShippingAddress = getProvinceName(
    shippingAddress?.country,
    shippingAddress?.province
  );
  const formattedDate = customer?.dateOfBirth
    ? format(new Date(customer.dateOfBirth), "dd/MM/yyyy")
    : "";

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
                {capitalizeWords(customer?.name) || "--"}
              </p>
              <p>
                <span>Apellidos</span>
                {capitalizeWords(customer?.lastname) || "--"}
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
                {formattedDate}
              </p>

              <p>
                <span>Genero:</span> {capitalizeWords(customer?.gender) || "--"}
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
                <th>Pedido n° </th>
                <th>Fecha de pedido</th>
                <th>Dirección de envío </th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {orders?.length !== 0 && (
                <tr>
                  <TDnowrap>{recentOrder?.orderNumber || "--"}</TDnowrap>
                  <td>{formatDateToEcuador(recentOrder?.createdAt) || "--"}</td>
                  <TD>
                    {recentOrder
                      ? `${recentOrder?.streetAddress}, ${recentOrder?.city}, ${recentOrder?.province}, ${recentOrder?.country}.`
                      : "--"}
                  </TD>
                  <td>
                    {formatPrice(calcularTotal(recentOrder?.line_items)) || ""}
                  </td>
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
          {!orders?.length && (
            <ContentEmpty>
              <p>No tienes pedidos para mostrar</p>
            </ContentEmpty>
          )}
        </ScrollContainer>
      </InfoSection>

      <InfoSection>
        <div className="header-section">
          <SectionTitle>Mis Direcciones</SectionTitle>
          <ComponenteLink
            href="/customer/mi-cuenta/direcciones"
            title="Ir a direcciones"
          >
            Ver todos
          </ComponenteLink>
        </div>
        <Wrapper>
          <Article>
            <FlexHeader>
              <SectionTitle>Dirección de Facturación </SectionTitle>
              {!billingAddress ? (
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
            {billingAddress ? (
              <>
                <p>
                  <span>Nombres</span>
                  {billingAddress?.name || billingAddress?.lastname
                    ? `${capitalizeWords(
                        billingAddress?.name
                      )} ${capitalizeWords(billingAddress?.lastname)}`
                    : "--"}
                </p>

                <p>
                  <span>Dirección</span>
                  {capitalizeWords(billingAddress?.streetAddress) || "--"}
                </p>

                <p>
                  <span>Provincia:</span>
                  {provinceBillingAddress || "--"}
                </p>

                <p>
                  <span>Cantón:</span>
                  {billingAddress?.canton || "--"}
                </p>

                <p>
                  <span>País:</span>
                  {billingAddress?.country || "--"}
                </p>
                <p>
                  <span>Postal:</span>
                  {billingAddress?.postal || "--"}
                </p>

                <p>
                  <span>Teléfono:</span>
                  {billingAddress?.phone || "--"}
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
              {!shippingAddress ? (
                <ComponenteLink
                  href="/customer/mi-cuenta/direcciones"
                  title="Agregar dirección de envío"
                >
                  <AddIcon size={22} />
                </ComponenteLink>
              ) : (
                <ComponenteLink
                  href="/customer/mi-cuenta/direcciones"
                  title="Editar mi dirección de envío"
                >
                  <EdithIcon size={22} />
                </ComponenteLink>
              )}
            </FlexHeader>
            {shippingAddress ? (
              <>
                <p>
                  <span>Nombres</span>
                  {shippingAddress?.name || shippingAddress?.lastname
                    ? `${capitalize(shippingAddress?.name)} ${capitalize(
                        shippingAddress?.lastname
                      )}`
                    : "--"}
                </p>
                <p>
                  <span>Dirección</span>
                  {capitalize(shippingAddress?.streetAddress) || "--"}
                </p>
                <p>
                  <span>Provincia:</span>
                  {provinceShippingAddress || "--"}
                </p>
                <p>
                  <span>Cantón:</span>
                  {shippingAddress?.canton || "--"}
                </p>
                <p>
                  <span>País:</span>
                  {shippingAddress?.country || "--"}
                </p>
                <p>
                  <span>Postal:</span>
                  {shippingAddress?.postal || "--"}
                </p>
                <p>
                  <span>Teléfono:</span>
                  {shippingAddress?.phone || "--"}
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
