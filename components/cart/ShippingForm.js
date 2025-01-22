import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useData } from "@/hooks/useData";
import NotificationContext from "@/context/NotificationContext";
import { Loading } from "../Loading";
import InputGroup from "../Account/forms/InputGroup";
import { countries, fieldLabels } from "@/resource/curtomerData";
import { WhatsappIcon } from "../Icons";
import { loadStatesAndCities } from "@/utils/loadStatesAndCities";
import Button from "../buttonComponents/Button";
import { handleCreateOrder } from "@/utils/handlers/order";
import { capitalize } from "@/utils/formats/capitalize";

// Estilos usando Styled Components
const FormContainer = styled.form`
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const WrapperDiv = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 5px;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
  }
`;
const WrapperButton = styled.section`
  display: flex;
  justify-content: end;
  gap: 10px;
  padding: 20px 0;
  justify-content: center;
`;

const ShippingForm = ({
  shippingAddress,
  mutateAddress,
  isLoading,
  cartProducts,
  clearCart,
}) => {
  const router = useRouter();
  const { showNotification } = useContext(NotificationContext);
  const { company } = useData();
  const secondaryPhone = company?.secondaryPhone;

  const [formState, setFormState] = useState(
    shippingAddress
      ? {
          name: shippingAddress?.name || "",
          lastname: shippingAddress?.lastname || "",
          email: shippingAddress?.email || "",
          idDocument: shippingAddress?.idDocument || "",
          phone: shippingAddress?.phone || "",
          country: shippingAddress?.country || "",
          province: shippingAddress?.province || "",
          canton: shippingAddress?.canton || "",
          streetAddress: shippingAddress?.streetAddress || "",
          postal: shippingAddress?.postal || "",
        }
      : {}
  );

  const [isChecked, setIsChecked] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Estados y ciudades específicos para cada dirección
  const [states, setStates] = useState({
    shippingAddress: [],
  });
  const [cities, setCities] = useState({
    shippingAddress: [],
  });

  useEffect(() => {
    if (shippingAddress) {
      setFormState(shippingAddress);
    }
  }, [shippingAddress]);

  useEffect(() => {
    const { statesData, citiesData } = loadStatesAndCities(countries);
    setStates(statesData);
    setCities(citiesData);
  }, []);

  useEffect(() => {
    const {
      name,
      lastname,
      email,
      idDocument,
      phone,
      country,
      province,
      canton,
      streetAddress,
      postal,
    } = formState;

    const isChanged =
      name !== shippingAddress?.name ||
      lastname !== shippingAddress?.lastname ||
      email !== shippingAddress?.email ||
      idDocument !== shippingAddress?.idDocument ||
      phone !== shippingAddress?.phone ||
      country !== shippingAddress?.country ||
      province !== shippingAddress?.province ||
      canton !== shippingAddress?.canton ||
      streetAddress !== shippingAddress?.streetAddress ||
      postal !== shippingAddress?.postal;

    setHasChanges(isChanged); // Actualiza el estado hasChanges
  }, [formState, shippingAddress]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "country") {
      const selectedCountry = countries.find((c) => c.isoCode === value);
      setFormState((prev) => ({
        ...prev,
        country: selectedCountry?.isoCode,
        province: "",
        canton: "",
      }));
    } else if (name === "province") {
      const selectedProvince = states[formState?.country]?.find(
        (p) => p.isoCode === value
      );
      setFormState((prev) => ({
        ...prev,
        province: selectedProvince?.isoCode,
        canton: "",
      }));
    } else if (name === "canton") {
      setFormState((prev) => ({
        ...prev,
        canton: value,
      }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSaveInformation = async () => {
    if (isChecked) {
      try {
        const type = "shippingAddress";
        const address = {
          name: formState?.name,
          lastname: formState?.lastname,
          email: formState?.email,
          country: formState?.country,
          province: formState?.province,
          canton: formState?.canton,
          postal: formState?.postal,
          streetAddress: formState?.streetAddress,
          idDocument: formState?.idDocument,
          phone: formState?.phone,
        };

        // Enviar solicitud PUT
        const response = await axios.put("/api/customers/addresses", {
          type,
          address,
        });

        if (response.status === 200) {
          showNotification({
            open: true,
            msj:
              response?.data?.message ||
              "Información guardada para futuros envíos.",
            status: "success",
          });

          mutateAddress(
            (currentData) => ({
              ...currentData,
              shippingAddress: address,
            }),
            false
          );
        } else {
          // Si la respuesta no tiene status 200, mostrar un mensaje de error
          showNotification({
            open: true,
            msj:
              response?.data?.error || "No se pudieron actualizar los datos.",
            status: "error",
          });
        }
      } catch (error) {
        // Manejo de errores
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "No se pudieron actualizar los datos.";

        showNotification({
          open: true,
          msj: errorMessage,
          status: "error",
        });

        console.error("Error al guardar la información:", errorMessage);
      }
    }
  };

  async function handleShippingOrder() {
    handleCreateOrder({
      name: formState?.name,
      lastname: formState?.lastname,
      email: formState?.email,
      idDocument: formState?.idDocument,
      phone: formState?.phone,
      country: formState?.country,
      province: formState?.province,
      city: formState?.canton,
      streetAddress: formState?.streetAddress,
      postal: formState?.postal,
      cartProducts,
      clearCart,
    });
  }

  const handleShippingWithSave = (e) => {
    e.preventDefault();
    handleSaveInformation();
    handleShippingOrder();
  };

  //Funcion para envio de pedido por whatsapp
  const handleShippingOrderWhatsapp = async (e) => {
    e.preventDefault();
    const orderData = {
      name: formState?.name,
      lastname: formState?.lastname,
      email: formState?.email,
      country: formState?.country,
      province: formState?.province,
      city: formState?.canton,
      postal: formState?.postal,
      streetAddress: formState?.streetAddress,
      idDocument: formState?.idDocument,
      phone: formState?.phone,
      cartProducts,
    };
    if (!cartProducts || cartProducts.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Carrito vacío",
        text: "No puedes enviar un pedido sin productos.",
      });
      return;
    }

    // Mostrar mensaje de carga
    Swal.fire({
      title: "Creando pedido...",
      text: "Por favor, espera un momento.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await axios.post("/api/checkout", orderData);
      const data = response.data;
      if (response.status === 200) {
        const whatsappMessage = `Hola, Soy: ${capitalize(data?.orderData?.name)}
          Mi celular: ${data?.orderData?.phone}
          Email: ${data?.orderData.email}
          Me interesa comprar los siguientes productos:
            ${data.orderData.line_items
              .map(
                (item, index) =>
                  `${index + 1}. ${capitalize(item.info_order.name)} (${
                    item.info_order.code
                  }) - Cant: ${item.quantity} - Precio: $${
                    item.info_order.price
                  }`
              )
              .join("\n")}.
          Quedo atento/a para más información`;

        const urlWhatsapp = `https://api.whatsapp.com/send?phone=593${secondaryPhone}&text=${encodeURIComponent(
          whatsappMessage
        )}&type=phone_number&app_absent=1`;
        window.open(urlWhatsapp, "_blank", "noopener noreferrer");

        Swal.fire({
          icon: "success",
          title: "Pedido creado",
          text: data?.message || "Tu pedido se ha creado exitosamente.",
        });
      } else {
        throw new Error(response.data?.message || "Error al crear el pedido.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Algo salió mal!",
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <h3>Información de envío </h3>
      <small>Esta información se utilizará para el envio del pedido.</small>
      <p>
        Por favor, lea cuidadosamente si los campos con la información guardada son los correctos, caso contrario pueden ser editados y/o guardados.
      </p>
      <FormContainer onSubmit={handleShippingWithSave}>
        <WrapperDiv>
          <InputGroup
            required
            label={fieldLabels.name}
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="Ingresa tu nombre"
          />
          <InputGroup
            required
            label={fieldLabels.lastname}
            name="lastname"
            value={formState.lastname}
            onChange={handleChange}
            placeholder="Ingresa tu apellido"
          />
        </WrapperDiv>
        <WrapperDiv>
          <InputGroup
            required
            type="email"
            name="email"
            label={fieldLabels.email}
            value={formState.email}
            onChange={handleChange}
            placeholder="Ingresa tu correo"
          />
          <InputGroup
            required
            type="tel"
            name="phone"
            label={fieldLabels.phone}
            placeholder="Ingresa un telf."
            value={formState.phone}
            onChange={handleChange}
          />
        </WrapperDiv>
        <WrapperDiv>
          <InputGroup
            required
            name="idDocument"
            label={fieldLabels.idDocument}
            value={formState.idDocument}
            onChange={handleChange}
            placeholder="Ingresa tu CI"
          />
          <InputGroup
            type="text"
            name="postal"
            label={fieldLabels.postal}
            value={formState.postal}
            onChange={handleChange}
            placeholder="Ingresa codigo postal"
          />
        </WrapperDiv>
        <WrapperDiv $column>
          <InputGroup
            required
            as="select"
            name="country"
            label={fieldLabels.country}
            value={formState?.country}
            onChange={handleChange}
            options={countries.map((c) => ({
              name: c.isoCode,
              value: c.isoCode,
            }))}
          />

          <InputGroup
            required
            as="select"
            name="province"
            label={fieldLabels.province}
            value={formState.province}
            onChange={handleChange}
            options={
              (formState.country &&
                states[formState.country]?.map((state) => ({
                  name: state.name,
                  value: state.isoCode,
                }))) ||
              []
            }
          />

          <InputGroup
            required
            as="select"
            name="canton"
            label={fieldLabels.canton}
            value={formState?.canton}
            onChange={handleChange}
            options={
              (formState?.province &&
                cities[formState.province]?.map((city) => ({
                  name: city.name,
                  value: city.name,
                }))) ||
              []
            }
          />
        </WrapperDiv>

        <InputGroup
          required
          name="streetAddress"
          label={fieldLabels.address}
          value={formState.streetAddress}
          onChange={handleChange}
          placeholder="Escribe una dirección"
        />

        {hasChanges && (
          <InputGroup
            name="send-checkbox"
            type="checkbox"
            id="send-checkbox"
            label="Guardar esta información para próximos envíos?"
            onChange={handleCheckboxChange}
            isChecked={isChecked}
            showCheckbox={hasChanges}
          />
        )}
        <WrapperButton>
          <Button
            type="submit"
            $black={1}
            title={"Se envia pedido directo para realizar la compra"}
            onClick={handleShippingWithSave}
          >
            ENVIAR PEDIDO DIRECTO
          </Button>
          <Button
            onClick={handleShippingOrderWhatsapp}
            title={"Se envía pedido para requerir información"}
            $secondary={1}
          >
            <WhatsappIcon height={25} width={25} />
            PEDIR POR WHATSAPP
          </Button>
        </WrapperButton>
      </FormContainer>
    </>
  );
};

export default ShippingForm;
