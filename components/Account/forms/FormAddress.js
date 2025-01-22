import React, { useState, useEffect, useContext, useMemo } from "react";
import NotificationContext from "@/context/NotificationContext";
import { countries } from "@/resource/curtomerData";
import { loadStatesAndCities } from "@/utils/loadStatesAndCities";
import axios from "axios";
import {
  Form,
  SectionTitle,
  Button,
  WrapperButton,
} from "@/components/stylesComponents/ComponentAccount";
import InputGroup from "./InputGroup";
import useCustomerAddress from "@/hooks/useAddress";

const fieldLabels = {
  name: "Nombres",
  lastname: "Apellidos",
  email: "Correo",
  country: "Pais",
  province: "Provincia",
  canton: "Canton",
  postal: "Codigo postal",
  streetAddress: "Direccion",
  idDocument: "Documento de identidad",
  phone: "Teléfono",
};

const FormAddress = () => {
  const { showNotification } = useContext(NotificationContext);
  const { billingAddress, shippingAddress, mutateAddress, isLoading } =
    useCustomerAddress();
  const [isLoadingButton, setIsLoadingButton] = useState({
    billingAddress: false,
    shippingAddress: false,
  });
  const [isValid, setIsValid] = useState({
    billingAddress: false,
    shippingAddress: false,
  });

  const initialAddresses = {
    billingAddress: {
      name: billingAddress?.name || "",
      lastname: billingAddress?.lastname || "",
      email: billingAddress?.email || "",
      idDocument: billingAddress?.idDocument || "",
      phone: billingAddress?.phone || "",
      country: billingAddress?.country || "",
      province: billingAddress?.province || "",
      canton: billingAddress?.canton || "",
      streetAddress: billingAddress?.streetAddress || "",
      postal: billingAddress?.postal || "",
    },
    shippingAddress: {
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
    },
  };
  const [addresses, setAddresses] = useState(initialAddresses);
  const [originalAddresses, setOriginalAddresses] = useState(initialAddresses);

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

  useEffect(() => {
    setAddresses({
      billingAddress: billingAddress || {},
      shippingAddress: shippingAddress || {},
    });
    setOriginalAddresses({
      billingAddress: billingAddress || {},
      shippingAddress: shippingAddress || {},
    });
  }, [billingAddress, shippingAddress]);

  useEffect(() => {
    const validateSection = (type) => {
      const current = addresses[type];
      const original = originalAddresses[type];

      // Verificar que todos los campos estén llenos
      const allFieldsFilled = Object.values(current).every((value) =>
        value.trim()
      );

      // Verificar si hay diferencias
      const hasChanges = Object.keys(current).some(
        (key) => current[key] !== original[key]
      );

      return allFieldsFilled && hasChanges;
    };

    setIsValid({
      billingAddress: validateSection("billingAddress"),
      shippingAddress: validateSection("shippingAddress"),
    });
  }, [addresses, originalAddresses]);

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (name === "country") {
      const selectedCountry = countries.find((c) => c.isoCode === value);
      setAddresses((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          country: selectedCountry?.isoCode,
          province: "",
          canton: "",
        },
      }));
    } else if (name === "province") {
      const selectedProvince = states[addresses[type]?.country]?.find(
        (p) => p.isoCode === value
      );
      setAddresses((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          province: selectedProvince?.isoCode,
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
      setIsLoadingButton((prev) => ({ ...prev, [type]: true }));
      const address = addresses[type];

      // Enviar solicitud PUT
      const response = await axios.put("/api/customers/addresses", {
        type,
        address,
      });

      if (response.status === 200) {
        showNotification({
          open: true,
          msj: response.data?.message,
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
      setIsLoadingButton((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleCreateAddress = async (e, type) => {
    e.preventDefault();
    try {
      setIsLoadingButton((prev) => ({ ...prev, [type]: true }));
      const address = addresses[type];

      // Enviar solicitud POST
      const response = await axios.post("/api/customers/addresses", {
        type,
        address,
      });

      if (response.status === 201) {
        showNotification({
          open: true,
          msj: response.data.message,
          status: "success",
        });

        setOriginalAddresses((prev) => ({
          ...prev,
          [type]: addresses[type],
        }));

        mutateAddress(
          (currentData) => ({
            ...currentData,
            [type === "billingAddress" ? "billingAddress" : "shippingAddress"]:
              address,
          }),
          false
        );
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
      setIsLoadingButton((prev) => ({ ...prev, [type]: false }));
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
  return (
    <>
      {["billingAddress", "shippingAddress"].map((type) => {
        const title = type === "billingAddress" ? "Facturación" : "Envío";
        const isExisting = Object.values(originalAddresses[type]).every(
          (value) =>
            value !== null &&
            value !== undefined &&
            value.toString().trim() !== ""
        );
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
                      value={value || ""}
                      onChange={(e) => handleChange(e, type)}
                      options={countries.map((c) => ({
                        name: c.isoCode,
                        value: c.isoCode,
                      }))}
                    />
                  );
                }
                if (field === "province") {
                  const countryCode = addresses[type]?.country;
                  return (
                    <InputGroup
                      required
                      key={field}
                      as="select"
                      label={fieldLabels[field]}
                      name={field}
                      value={value || ""}
                      onChange={(e) => handleChange(e, type)}
                      options={states[countryCode]?.map((s) => ({
                        name: s.name,
                        value: s.isoCode,
                      }))}
                    />
                  );
                }
                if (field === "canton") {
                  const provinceCode = addresses[type]?.province;
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
                      $red
                      disabled={!isValid[type]}
                      onClick={() => handleCancel(type)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      $blue
                      disabled={!isValid[type]}
                      onClick={(e) => handleModifyAddress(e, type)}
                    >
                      {isLoadingButton[type] ? "Guardando..." : "Guardar"}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="button"
                      $red
                      disabled={!isValid[type]}
                      onClick={() => handleCancel(type)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      $blue
                      disabled={!isValid[type]}
                      onClick={(e) => handleCreateAddress(e, type)}
                    >
                      {isLoadingButton[type] ? "Creando..." : "Crear"}
                    </Button>
                  </>
                )}
              </WrapperButton>
            </Form>
          </div>
        );
      })}
    </>
  );
};

export default FormAddress;
