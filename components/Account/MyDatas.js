import { genersData } from "@/resource/curtomerData";
import React, { useContext, useState } from "react";
import InputGroup from "./forms/InputGroup";
import {
  Button,
  Container,
  Form,
  TitleH2,
  Wrapper,
  WrapperButton,
} from "../stylesComponents/ComponentAccount";
import BackButton from "../buttonComponents/BackButton";
import DateInputGroup from "./forms/DateInputGroup";
import { useHandleGoBack } from "@/hooks/useHandleGoBack";
import NotificationContext from "@/context/NotificationContext";
import { useSession } from "next-auth/react";
import axios from "axios";

const MyDatas = () => {
  const { showNotification } = useContext(NotificationContext);
  const handleGoBack = useHandleGoBack();
  const { data: session, status, update } = useSession();
  const customer = session?.user;

  const fieldLabels = {
    name: "Nombres",
    lastname: "Apellidos",
    email: "Correo",
    idDocument: "Documento de identidad",
    phone: "Teléfono",
    dateOfBirth: "Fecha de nacimiento",
    gender: "Genero",
  };
  const initialData = {
    name: customer?.name || "--",
    lastname: customer?.lastname || "--",
    email: customer?.email || "--",
    idDocument: customer?.idDocument || "--",
    phone: customer?.phone || "--",
    dateOfBirth: customer?.dateOfBirth || "",
    gender: customer?.gender || "--",
  };
  const [selectedDate, setSelectedDate] = useState(initialData?.dateOfBirth);
  const [customerData, setCustomerData] = useState(initialData);
  const [originalCustomerData, setOriginalCustomerData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updatedData = { ...customerData, dateOfBirth: selectedDate };

      // Enviar datos al servidor
      const response = await axios.put("/api/customers/update", updatedData);

      if (response.status === 200) {
        // Actualizar la sesión del usuario
        await update({
          ...session,
          user: { ...session.user, ...updatedData },
        });

        showNotification({
          open: true,
          msj: response.data.message,
          status: "success",
        });

        // Guardar el estado original actualizado
        setOriginalCustomerData(updatedData);
      } else {
        showNotification({
          open: true,
          msj: response.error || "No se pudieron actualizar los datos.",
          status: "error",
        });
      }
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      alert("Ocurrió un error. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomerCancel = () => {
    setCustomerData(originalCustomerData);
    showNotification({
      open: true,
      msj: "Cambios revertidos a su estado inicial.",
      status: "success",
    });
  };

  const hasCustomerChanges = () => {
    return (
      JSON.stringify(customerData) !== JSON.stringify(originalCustomerData)
    );
  };

  return (
    <Container>
      <header>
        <BackButton onClick={handleGoBack} />
        <TitleH2>Información personal</TitleH2>
      </header>
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <InputGroup
            required
            label={fieldLabels.name}
            name="name"
            value={customerData?.name}
            onChange={handleChange}
            placeholder="Ingresa tu nombre"
          />

          <InputGroup
            required
            label={fieldLabels.lastname}
            name="lastname"
            value={customerData?.lastname}
            onChange={handleChange}
          />
          <InputGroup
            required
            type="email"
            name="email"
            label={fieldLabels.email}
            value={customerData.email}
            onChange={handleChange}
          />
          <InputGroup
            required
            name="idDocument"
            label={fieldLabels.idDocument}
            value={customerData?.idDocument}
            onChange={handleChange}
          />

          <InputGroup
            type="tel"
            name="phone"
            label={fieldLabels.phone}
            value={customerData?.phone}
            onChange={handleChange}
          />

          <DateInputGroup
            label={fieldLabels.dateOfBirth}
            name="dateOfBirth"
            selectedDate={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholder="DD/MM/AAAA"
          />
          <InputGroup
            as="select"
            name="gender"
            label={fieldLabels.gender}
            value={customerData?.gender}
            onChange={handleChange}
            options={genersData.map((gener) => ({
              value: gener.name,
              name: gener.name,
            }))}
          />
          <WrapperButton>
            <Button
              type="button"
              title="Cancelar Cambios"
              onClick={handleCustomerCancel}
              disabled={!hasCustomerChanges()}
              $canceled
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              title="Guardar Cambios"
              disabled={!hasCustomerChanges()}
              $save
            >
              {isLoading ? "Guardando..." : "Guardar"}
            </Button>
          </WrapperButton>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default MyDatas;
