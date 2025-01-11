import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styled, { css } from "styled-components";
import { WhatsappIcon } from "@/components/Icons";
import { useData } from "@/hooks/useData";
import Layout from "@/components/Layout";
import BackButton from "@/components/buttonComponents/BackButton";
import Button from "@/components/buttonComponents/Button";
import TableCart from "@/components/cart/TableCart";
import { CenterSecction } from "@/components/stylesComponents/CenterSecction";
import { FlexStyled } from "@/components/stylesComponents/Flex";
import Title from "@/components/stylesComponents/Title";
import { CartContext } from "@/context/CartContext";
import NotificationContext from "@/context/NotificationContext";
import { grey, white } from "@/lib/colors";
import { capitalize } from "@/utils/formats/capitalize";
import InputGroup from "@/components/Account/forms/InputGroup";
import { countries } from "@/resource/curtomerData";
import { loadStatesAndCities } from "@/utils/loadStatesAndCities";
import { useHandleGoBack } from "@/hooks/useHandleGoBack";
import { handleCreateOrder } from "@/utils/handlers/order";
import useAddress from "@/hooks/useAddress";
import { Loading } from "@/components/Loading";
import { capitalizeWords } from "@/utils/formats/capitalizeWords";

const CenterDiv = styled.section`
  ${CenterSecction}
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media screen and (min-width: 769px) {
    grid-template-columns: 1fr 0.7fr;
    gap: 20px;
    margin: 20px 0 40px;
  }
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

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: fit-content;
  background-color: ${white};
  border-radius: 10px;
  padding: 15px;
  h3 {
    font-size: 1rem;
    margin: 0 0 20px;
  }
  p {
    font-size: 0.8rem;
    margin: 0;
    color: ${grey};
  }
  span {
    font-size: 0.8rem;
    margin: 0;
    color: ${grey};
  }

  ${(props) =>
    props.$form &&
    css`
      box-shadow: 1px 4px 20px rgb(0 0 0 / 20%);
    `}
  ${(props) =>
    props.$list &&
    css`
      display: flex;
      flex-direction: column;
      padding: 10px;
    `}
    @media screen and (min-width: 768px) {
    padding: 20px;
  }
`;

export default function CartPage() {
  const handleGoBack = useHandleGoBack();
  const { cartProducts, clearCart } = useContext(CartContext);
  const { shippingAddress, mutateAddress, isLoading } = useAddress();
  const { company } = useData();
  const secondaryPhone = company?.secondaryPhone;

  const { showNotification } = useContext(NotificationContext);
  const router = useRouter();

  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [idDocument, setIdDocument] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState({});
  const [province, setProvince] = useState({});
  const [city, setCity] = useState("");

  const [streetAddress, setStreetAddress] = useState("");
  const [postal, setPostal] = useState("");

  const [isChecked, setIsChecked] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const fieldLabels = {
    name: "Nombres",
    lastname: "Apellidos",
    email: "Correo",
    country: "Pais",
    province: "Provincia",
    canton: "Canton",
    postal: "Codigo postal",
    address: "Direccion",
    idDocument: "Documento de identidad",
    phone: "Teléfono",
  };

  // Estados y ciudades específicos para cada dirección
  const [states, setStates] = useState({
    shippingAddress: [],
  });
  const [cities, setCities] = useState({
    shippingAddress: [],
  });

  useEffect(() => {
    const { statesData, citiesData } = loadStatesAndCities(countries);
    setStates(statesData);
    setCities(citiesData);
  }, []);

  useEffect(() => {
    if (shippingAddress) {
      setName(shippingAddress?.name || "");
      setLastName(shippingAddress?.lastname || "");
      setEmail(shippingAddress?.email || "");
      setIdDocument(shippingAddress?.idDocument || "");
      setPhone(shippingAddress?.phone || "");
      setCountry(shippingAddress?.country || "");
      setProvince(shippingAddress?.province || "");
      setCity(shippingAddress?.canton || "");
      setStreetAddress(shippingAddress?.streetAddress || "");
      setPostal(shippingAddress?.postal || "");
    }
  }, [shippingAddress]);

  useEffect(() => {
    // Compara los valores actuales con los valores de shippingAddress
    const isChanged =
      name !== shippingAddress?.name ||
      lastname !== shippingAddress?.lastname ||
      email !== shippingAddress?.email ||
      idDocument !== shippingAddress?.idDocument ||
      phone !== shippingAddress?.phone ||
      country !== shippingAddress?.country ||
      province !== shippingAddress?.province ||
      city !== shippingAddress?.canton ||
      streetAddress !== shippingAddress?.streetAddress ||
      postal !== shippingAddress?.postal;

    setHasChanges(isChanged); // Actualiza el estado hasChanges
  }, [
    name,
    lastname,
    email,
    idDocument,
    phone,
    country,
    province,
    city,
    streetAddress,
    postal,
    shippingAddress,
  ]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    if (name === "country") {
      const selectedCountry = countries.find((c) => c.isoCode === value);
      setCountry(selectedCountry?.isoCode);
      setProvince("");
      setCity("");
    } else if (name === "province") {
      const selectedProvince = states[shippingAddress?.country]?.find(
        (p) => p.isoCode === value
      );
      setProvince(selectedProvince?.isoCode);
      setCity("");
    } else if (name === "city") {
      setCity(value);
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
          name,
          lastname,
          email,
          country,
          province,
          canton: city,
          postal,
          streetAddress,
          idDocument,
          phone,
        };

        // Enviar solicitud PUT
        const response = await axios.put("/api/customers/address", {
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
      name,
      lastname,
      email,
      idDocument,
      phone,
      country,
      province,
      city,
      streetAddress,
      postal,
      cartProducts,
      clearCart,
    });
  }

  const handleShippingWithSave = () => {
    handleShippingOrder();
    handleSaveInformation();
  };

  //Funcion para envio de pedido por whatsapp
  const submitOrderWhatsapp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/checkout", orderData);
      const data = response.data;
      if (response.status === 200) {
        const whatsappMessage = `Hola, Soy: ${capitalize(orderData.name)}
  Mi celular: ${orderData.phone}
  Email: ${orderData.email}
  Dirección: ${capitalize(orderData.streetAddress)}, ${capitalize(
          orderData.city
        )}, ${capitalize(orderData.country)}
  Me interesa comprar los siguientes productos:
  ${data.orderData.line_items
    .map(
      (item, index) =>
        `${index + 1}. ${capitalize(item.info_order.name)} (${
          item.info_order.code
        }) - Cant: ${item.quantity} - Precio: $${item.info_order.price}`
    )
    .join("\n")}.
  Quedo atento/a`;

        const urlWhatsapp = `https://api.whatsapp.com/send?phone=593${secondaryPhone}&text=${encodeURIComponent(
          whatsappMessage
        )}&type=phone_number&app_absent=1`;
        window.open(urlWhatsapp, "_blank", "noopener noreferrer");
        showNotification({
          open: true,
          msj: data.message,
          status: "success",
        });

        clearCart();

        const timeout = setTimeout(() => {
          router.push("/");
        }, 1000);
        return () => clearTimeout(timeout);
      } else {
        showNotification({
          open: true,
          msj: data.message,
          status: "error",
        });
      }
    } catch (error) {
      showNotification({
        open: true,
        msj: error.response.data.message,
        status: "error",
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout title="B.R.D | Mi carrito">
      <CenterDiv>
        <FlexStyled>
          <BackButton onClick={handleGoBack} />
          <Title>Carrito de compras</Title>
        </FlexStyled>
        <ColumnsWrapper>
          <Box $list={1}>
            <TableCart />
          </Box>
          {!!cartProducts?.length && (
            <Box $white={1}>
              <h3>Información de envío </h3>
              <small>
                Esta información se utilizará para el envio del pedido.
              </small>
              <p>
                Por favor, lea cuidadosamente si los campos con la información
                guardada son los correctos, caso contrario puede ser editado y/o
                guardados.{" "}
              </p>
              <WrapperDiv>
                <InputGroup
                  required
                  label={fieldLabels.name}
                  name="name"
                  value={capitalizeWords(name)}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ingresa tu nombre"
                />

                <InputGroup
                  required
                  label={fieldLabels.lastname}
                  name="lastname"
                  value={capitalizeWords(lastname)}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Ingresa tu apellido"
                />
              </WrapperDiv>
              <WrapperDiv>
                <InputGroup
                  required
                  type="email"
                  name="email"
                  label={fieldLabels.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputGroup
                  type="text"
                  name="postal"
                  label={fieldLabels.postal}
                  value={postal}
                  onChange={(e) => setPostal(e.target.value)}
                />
              </WrapperDiv>
              <WrapperDiv>
                <InputGroup
                  required
                  name="idDocument"
                  label={fieldLabels.idDocument}
                  value={idDocument}
                  onChange={(e) => setIdDocument(e.target.value)}
                />

                <InputGroup
                  required
                  type="tel"
                  name="phone"
                  label={fieldLabels.phone}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </WrapperDiv>
              <WrapperDiv $column>
                <InputGroup
                  required
                  as="select"
                  name="country"
                  label={fieldLabels.country}
                  value={country}
                  onChange={(e) => handleAddressChange(e)}
                  options={countries.map((c) => ({
                    name: c.name,
                    value: c.isoCode,
                  }))}
                />
                <InputGroup
                  required
                  as="select"
                  name="province"
                  label={fieldLabels.province}
                  value={province}
                  onChange={(e) => handleAddressChange(e)}
                  options={
                    (country &&
                      states[country]?.map((state) => ({
                        name: state.name,
                        value: state.isoCode,
                      }))) ||
                    []
                  }
                />
                <InputGroup
                  required
                  as="select"
                  name="city"
                  label={fieldLabels.canton}
                  value={city}
                  onChange={(e) => handleAddressChange(e)}
                  options={
                    (province &&
                      cities[province]?.map((city) => ({
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
                value={capitalizeWords(streetAddress)}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder="Escribe una dirección"
              />
              {hasChanges && (
                /*    <div>
                  <label htmlFor="send-checkbox">
                    <input
                      type="checkbox"
                      id="send-checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    Guardar esta información para próximos envíos?
                  </label>
                </div> */

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
                  $black={1}
                  title={"Se envia pedido directo para realizar la compra"}
                  onClick={handleShippingWithSave}
                >
                  ENVIAR PEDIDO DIRECTO
                </Button>
                <Button
                  onClick={submitOrderWhatsapp}
                  title={"Se envía pedido para requerir información"}
                  $secondary={1}
                >
                  <WhatsappIcon height={25} width={25} />
                  PEDIR POR WHATSAPP
                </Button>
              </WrapperButton>
            </Box>
          )}
        </ColumnsWrapper>
      </CenterDiv>
    </Layout>
  );
}
