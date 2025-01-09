import React, { useContext, useEffect, useState } from "react";
import { countries, customerInfo } from "../../resource/curtomerData";
import InputGroup from "./forms/InputGroup";
import { loadStatesAndCities } from "@/utils/loadStatesAndCities";
import BackButton from "../buttonComponents/BackButton";
import {
  Button,
  Container,
  SectionTitle,
  TitleH2,
  Wrapper,
  WrapperButton,
  Form,
} from "../stylesComponents/ComponentAccount";
import { useHandleGoBack } from "@/hooks/useHandleGoBack";
import NotificationContext from "@/context/NotificationContext";
import axios from "axios";
import useAddress from "@/hooks/useAddress";

const MyAddress = () => {
  const { showNotification } = useContext(NotificationContext);
  const handleGoBack = useHandleGoBack();
  const { billingAddress, shippingAddress } = useAddress()

  const initialAddresses = {
    billingAddress: billingAddress || {},
    shippingAddress: shippingAddress || {},
  };

  const [addresses, setAddresses] = useState(initialAddresses);
  const [originalAddresses, setOriginalAddresses] = useState(initialAddresses);
  const [isLoading, setIsLoading] = useState(false);

  // Estados y ciudades específicos para cada dirección
  const [states, setStates] = useState({
    billingAddress: [],
    shippingAddress: [],
  });
  const [cities, setCities] = useState({
    billingAddress: [],
    shippingAddress: [],
  });

  useEffect(() => {
    const { statesData, citiesData } = loadStatesAndCities(countries);
    setStates(statesData);
    setCities(citiesData);
  }, []);

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (name === "country") {
      const selectedCountry = countries.find((c) => c.isoCode === value);

      setAddresses((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          country: selectedCountry,
          province: "",
          canton: "",
        },
      }));
    } else if (name === "province") {
      const selectedProvince = states[addresses[type].country.isoCode].find(
        (p) => p.isoCode === value
      );

      setAddresses((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          province: selectedProvince,
          canton: "",
        },
      }));
    } else if (name === "canton") {
      setAddresses((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          canton: value,
        },
      }));
    } else {
      setAddresses((prev) => ({
        ...prev,
        [type]: { ...prev[type], [name]: value },
      }));
    }
  };

  const handleModifyAddress = async (e, type) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const address = addresses[type];

      // Enviar solicitud PUT
      const response = await axios.put("/api/customers/address", {
        type,
        address,
      });

      if (response.status === 200) {
     
        showNotification({
          open: true,
          msj: response.data.message,
          status: "success",
        });

        setOriginalAddresses((prev) => ({
          ...prev,
          [type]: addresses[type],
        }));
      } else {
        showNotification({
          open: true,
          msj: response.error || "No se pudieron actualizar los datos.",
          status: "success",
        });
      }
    } catch (error) {
      showNotification({
        open: true,
        msj:
          error.response?.data?.message ||
          "No se pudieron actualizar los datos.",
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAddress = async (e, type) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const address = addresses[type];

      // Enviar solicitud POST
      const response = await axios.post("/api/customers/address", {
        type,
        address,
      });

      if (response.status === 201) {
        const updatedUser = {
          ...customer,
          [`${type}`]: address,
        };
        await update({ user: updatedUser });

        showNotification({
          open: true,
          msj: response.data.message,
          status: "success",
        });

        setOriginalAddresses((prev) => ({
          ...prev,
          [type]: addresses[type],
        }));
      } else {
        showNotification({
          open: true,
          msj: response.error || "No se pudo crear la dirección.",
          status: "error",
        });
      }
    } catch (error) {
      showNotification({
        open: true,
        msj: error.response?.data?.message || "No se pudo crear la dirección.",
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = (type) => {
    setAddresses((prev) => ({
      ...prev,
      [type]: originalAddresses[type],
    }));
    showNotification({
      open: true,
      msj: "Cambios revertidos a su estado inicial.",
      status: "success",
    });
  };

  const hasChanges = (type) => {
    return (
      JSON.stringify(addresses[type]) !==
      JSON.stringify(originalAddresses[type])
    );
  };

  const fieldLabels = {
    name: "Nombres",
    lastname: "Apellidos",
    email: "Correo",
    country: "Pais",
    province: "Provincia",
    canton: "Canton",
    streetAddress: "Direccion",
    postal: "Codigo postal",
    idDocument: "Documento de identidad",
    phone: "Teléfono",
  };

  return (
    <Container>
      <header>
        <BackButton onClick={handleGoBack} />
        <TitleH2>Mis Direcciones</TitleH2>
      </header>

      <Wrapper>
        {["billingAddress", "shippingAddress"].map((type) => {
          const title = type === "billingAddress" ? "Facturación" : "Envío";
          const isExisting = Object.keys(originalAddresses[type]).length > 0;
          return (
            <div key={type}>
              <p>Formulario de Dirección de {title}</p>

              <Form>
                <SectionTitle>{`Dirección de ${title}`}</SectionTitle>

                {Object.keys(fieldLabels).map((field) => {
                  const value = addresses[type][field];

                  if (field === "_id") return null;

                  if (field === "country") {
                    return (
                      <InputGroup
                        required
                        key={field}
                        as="select"
                        label={fieldLabels[field]}
                        name={field}
                        value={value?.isoCode || ""}
                        onChange={(e) => handleChange(e, type)}
                        options={countries.map((c) => ({
                          name: c.name,
                          value: c.isoCode,
                        }))}
                      />
                    );
                  }
                  if (field === "province") {
                    const countryCode = addresses[type]?.country?.isoCode;
                    return (
                      <InputGroup
                        required
                        key={field}
                        as="select"
                        label={fieldLabels[field]}
                        name={field}
                        value={value?.isoCode || ""}
                        onChange={(e) => handleChange(e, type)}
                        options={states[countryCode]?.map((s) => ({
                          name: s.name,
                          value: s.isoCode,
                        }))}
                      />
                    );
                  }
                  if (field === "canton") {
                    const provinceCode = addresses[type]?.province?.isoCode;
                    return (
                      <InputGroup
                        required
                        key={field}
                        as="select"
                        label={fieldLabels[field]}
                        name={field}
                        value={value || ""}
                        onChange={(e) => handleChange(e, type)}
                        options={cities[provinceCode]?.map((c) => ({
                          name: c.name,
                          value: c.name,
                        }))}
                      />
                    );
                  }

                  return (
                    <InputGroup
                      required
                      key={field}
                      name={field}
                      label={fieldLabels[field]}
                      value={value || ""}
                      onChange={(e) => handleChange(e, type)}
                    />
                  );
                })}

                <WrapperButton>
                  {isExisting ? (
                    <>
                      <Button
                        type="button"
                        $canceled
                        disabled={!hasChanges(type)}
                        onClick={() => handleCancel(type)}
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        $save
                        disabled={!hasChanges(type)}
                        onClick={(e) => handleModifyAddress(e, type)}
                      >
                        {isLoading ? "Guardando..." : "Guardar"}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        type="button"
                        $canceled
                        disabled={!hasChanges(type)}
                        onClick={() => handleCancel(type)}
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        $save
                        disabled={!hasChanges(type)}
                        onClick={(e) => handleCreateAddress(e, type)}
                      >
                        {isLoading ? "Creando..." : "Crear"}
                      </Button>
                    </>
                  )}
                </WrapperButton>
              </Form>
            </div>
          );
        })}
      </Wrapper>
    </Container>
  );
};

export default MyAddress;
