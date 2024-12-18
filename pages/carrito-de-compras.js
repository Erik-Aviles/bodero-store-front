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
import { error, grey, greylight, success, white } from "@/lib/colors";
import { capitalize } from "@/utils/capitalize";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import styled, { css } from "styled-components";

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

const WrapperDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  ${(props) =>
    props.$center &&
    css`
      justify-content: space-evenly;
    `}
  ${(props) =>
    props.$column &&
    css`
      @media screen and (max-width: 370px) {
        flex-direction: column;
      }
    `}
`;

const Box = styled.div`
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
    margin-left: 20px;
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

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 0 10px;
  label {
    font-size: 12px;
    font-weight: 400;
    color: ${grey};
  }
  input {
    display: block;
    color: ${grey};
    padding: 0.5rem 1rem;
    border: 0.5px solid #878787;
    font-size: 0.7rem;
    border-radius: 6px;
    transition-duration: 0.3s;
    outline: 0.5px solid transparent;
    &:focus {
      outline: 1px solid ${error};
    }
    &::placeholder {
      color: ${greylight};
      font-style: italic;
    }
  }
`;

export default function CartPage() {
  const { company } = useData();
  const secondaryPhone = company?.secondaryPhone;

  const { showNotification } = useContext(NotificationContext);
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");

  const { cartProducts, clearCart } = useContext(CartContext);
  const orderData = {
    name,
    email,
    phone,
    city,
    streetAddress,
    country,
    cartProducts,
  };

  async function handleShippingOrder() {
    try {
      const response = await axios.post("/api/order", orderData);
      showNotification({
        open: true,
        msj: response.data.message,
        status: "success",
      });

      clearCart();

      const timeout = setTimeout(() => {
        router.push("/");
      }, 1000);
      return () => clearTimeout(timeout);
    } catch (error) {
      showNotification({
        open: true,
        msj: error.response.data.message,
        status: "error",
      });
    }
  }

  const submitOrder = async (e) => {
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

  const handleGoBack = (e) => {
    e.preventDefault();
    router.back();
  };

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
              <InputContainer>
                <label htmlFor="name">Nombre y Apellido</label>
                <input
                  type="text"
                  placeholder="Nombre.."
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputContainer>
              <WrapperDiv $column>
                <InputContainer>
                  <label htmlFor="email">Correo</label>
                  <input
                    type="text"
                    placeholder="Correo..."
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputContainer>

                <InputContainer>
                  <label htmlFor="phone">Teléfono</label>
                  <input
                    type="text"
                    placeholder="Teléfono..."
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </InputContainer>
              </WrapperDiv>
              <WrapperDiv $column>
                <InputContainer>
                  <label htmlFor="city">Ciudad</label>
                  <input
                    type="text"
                    placeholder="Ciudad..."
                    id="city"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </InputContainer>{" "}
                <InputContainer>
                  <label htmlFor="country">País</label>
                  <input
                    type="text"
                    placeholder="País..."
                    id="country"
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </InputContainer>
              </WrapperDiv>{" "}
              <InputContainer>
                <label htmlFor="streetAddress">Dirección</label>
                <input
                  type="text"
                  placeholder="Dirección..."
                  id="streetAddress"
                  name="streetAddress"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                />
              </InputContainer>
              <WrapperDiv $center>
                <Button
                  $black={1}
                  title={"Se envia pedido directo para realizar la compra"}
                  onClick={handleShippingOrder}
                >
                  ENVIAR PEDIDO DIRECTO
                </Button>
                <Button
                  onClick={submitOrder}
                  title={"Se envía pedido para requerir información"}
                  $secondary={1}
                >
                  <WhatsappIcon height={25} width={25} />
                  PEDIR POR WHATSAPP
                </Button>
              </WrapperDiv>
            </Box>
          )}
        </ColumnsWrapper>
      </CenterDiv>
    </Layout>
  );
}
