import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import styled, { css } from 'styled-components'
import { WhatsappIcon } from '@/components/Icons'
import { useData } from '@/hooks/useData'
import Layout from '@/components/Layout'
import BackButton from '@/components/buttonComponents/BackButton'
import Button from '@/components/buttonComponents/Button'
import TableCart from '@/components/cart/TableCart'
import { CenterSecction } from '@/components/stylesComponents/CenterSecction'
import { FlexStyled } from '@/components/stylesComponents/Flex'
import Title from '@/components/stylesComponents/Title'
import { CartContext } from '@/context/CartContext'
import NotificationContext from '@/context/NotificationContext'
import { error, grey, greylight, success, white } from '@/lib/colors'
import { capitalize } from '@/utils/capitalize'
import InputGroup from '@/components/Account/forms/InputGroup'
import { countries, customerInfo } from '@/resource/curtomerData'
import { loadStatesAndCities } from '@/utils/loadStatesAndCities'
import { useHandleGoBack } from '@/hooks/useHandleGoBack'

const CenterDiv = styled.section`
  ${CenterSecction}
`

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media screen and (min-width: 769px) {
    grid-template-columns: 1fr 0.7fr;
    gap: 20px;
    margin: 20px 0 40px;
  }
`

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
`
const WrapperButton = styled.section`
  display: flex;
  justify-content: end;
  gap: 10px;
  padding: 20px 0;
  justify-content: center;
`

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
`

export default function CartPage() {
  const handleGoBack = useHandleGoBack()
  const { company } = useData()
  const secondaryPhone = company?.secondaryPhone

  const { showNotification } = useContext(NotificationContext)
  const router = useRouter()
  const { cartProducts, clearCart } = useContext(CartContext)

  const [name, setName] = useState(customerInfo.billingAddress.name || '')
  const [lastname, setLastName] = useState(
    customerInfo.billingAddress.lastname || ''
  )
  const [email, setEmail] = useState(customerInfo.billingAddress.email || '')
  const [idDocument, setIdDocument] = useState(
    customerInfo.billingAddress.idDocument || ''
  )
  const [phone, setPhone] = useState(customerInfo.billingAddress.phone || '')
  const [country, setCountry] = useState(
    customerInfo.billingAddress.country.isoCode || ''
  )
  const [province, setProvince] = useState(
    customerInfo.billingAddress.province.isoCode || ''
  )
  const [city, setCity] = useState(customerInfo.billingAddress.canton || '')

  const [states, setStates] = useState({})
  const [cities, setCities] = useState({})

  const [streetAddress, setStreetAddress] = useState(
    customerInfo.billingAddress.address || ''
  )

  const fieldLabels = {
    name: 'Nombres',
    lastname: 'Apellidos',
    email: 'Correo',
    country: 'Pais',
    province: 'Provincia',
    canton: 'Canton',
    postal: 'Codigo postal',
    address: 'Direccion',
    idDocument: 'Documento de identidad',
    phone: 'Teléfono',
  }

  useEffect(() => {
    const { statesData, citiesData } = loadStatesAndCities(countries)
    setStates(statesData)
    setCities(citiesData)
  }, [])

  const orderData = {
    name,
    lastname,
    email,
    idDocument,
    phone,
    country,
    province,
    city,
    streetAddress,
    cartProducts,
  }
  const handleAddressChange = (e) => {
    const { name, value } = e.target
    if (name === 'country') {
      setCountry(value)
      setProvince('') / setCity('')
    } else if (name === 'province') {
      setProvince(value)
      setCity('')
    } else if (name === 'canton') {
      setCity(value)
    }
  }

  async function handleShippingOrder() {
    try {
      const response = await axios.post('/api/order', orderData)
      showNotification({
        open: true,
        msj: response.data.message,
        status: 'success',
      })

      clearCart()

      const timeout = setTimeout(() => {
        router.push('/')
      }, 1000)
      return () => clearTimeout(timeout)
    } catch (error) {
      showNotification({
        open: true,
        msj: error.response.data.message,
        status: 'error',
      })
    }
    console.log('Mi informacion de envio:', orderData)
  }

  const submitOrder = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/checkout', orderData)
      const data = response.data
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
    .join('\n')}.
  Quedo atento/a`

        const urlWhatsapp = `https://api.whatsapp.com/send?phone=593${secondaryPhone}&text=${encodeURIComponent(
          whatsappMessage
        )}&type=phone_number&app_absent=1`
        window.open(urlWhatsapp, '_blank', 'noopener noreferrer')
        showNotification({
          open: true,
          msj: data.message,
          status: 'success',
        })

        clearCart()

        const timeout = setTimeout(() => {
          router.push('/')
        }, 1000)
        return () => clearTimeout(timeout)
      } else {
        showNotification({
          open: true,
          msj: data.message,
          status: 'error',
        })
      }
    } catch (error) {
      showNotification({
        open: true,
        msj: error.response.data.message,
        status: 'error',
      })
    }
  }

  return (
    <Layout title='B.R.D | Mi carrito'>
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
              <WrapperDiv>
                <InputGroup
                  required
                  label={fieldLabels.name}
                  name='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Ingresa tu nombre'
                />

                <InputGroup
                  required
                  label={fieldLabels.lastname}
                  name='lastname'
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder='Ingresa tu apellido'
                />
              </WrapperDiv>
              <InputGroup
                required
                type='email'
                name='email'
                label={fieldLabels.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <WrapperDiv>
                <InputGroup
                  required
                  name='idDocument'
                  label={fieldLabels.idDocument}
                  value={idDocument}
                  onChange={(e) => setIdDocument(e.target.value)}
                />

                <InputGroup
                  required
                  type='tel'
                  name='phone'
                  label={fieldLabels.phone}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </WrapperDiv>
              <WrapperDiv $column>
                <InputGroup
                  required
                  as='select'
                  name='country'
                  label={fieldLabels.country}
                  value={country}
                  onChange={handleAddressChange}
                  options={countries.map((c) => ({
                    name: c.name,
                    value: c.isoCode,
                  }))}
                />
                <InputGroup
                  required
                  as='select'
                  name='province'
                  label={fieldLabels.province}
                  value={province}
                  onChange={handleAddressChange}
                  options={
                    states[country]?.map((state) => ({
                      name: state.name,
                      value: state.isoCode,
                    })) || []
                  }
                />
                <InputGroup
                  required
                  as='select'
                  name='canton'
                  label={fieldLabels.canton}
                  value={city}
                  onChange={handleAddressChange}
                  options={
                    cities[province]?.map((city) => ({
                      name: city.name,
                      value: city.name,
                    })) || []
                  }
                />
              </WrapperDiv>
              <InputGroup
                required
                name='streetAddress'
                label={fieldLabels.address}
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder='Escribe una dirección'
              />

              <WrapperButton>
                <Button
                  $black={1}
                  title={'Se envia pedido directo para realizar la compra'}
                  onClick={handleShippingOrder}
                >
                  ENVIAR PEDIDO DIRECTO
                </Button>
                <Button
                  onClick={submitOrder}
                  title={'Se envía pedido para requerir información'}
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
  )
}
