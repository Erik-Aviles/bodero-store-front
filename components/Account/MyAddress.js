import React, { useEffect, useState } from 'react'
import { countries, customerInfo } from '../../resource/curtomerData'
import InputGroup from './forms/InputGroup'
import { loadStatesAndCities } from '@/utils/loadStatesAndCities'
import BackButton from '../buttonComponents/BackButton'
import { handleGoBack } from '@/utils/handleGoBack'
import {
  Button,
  Container,
  SectionTitle,
  TitleH2,
  Wrapper,
  WrapperButton,
  Form,
} from '../stylesComponents/ComponentAccount'

const MyAddress = () => {
  const initialAddresses = {
    billingAddress: { ...customerInfo.billingAddress },
    shippingAddress: { ...customerInfo.shippingAddress },
  }

  const [addresses, setAddresses] = useState(initialAddresses)
  const [originalAddresses, setOriginalAddresses] = useState(initialAddresses)

  // Estados y ciudades específicos para cada dirección
  const [states, setStates] = useState({
    billingAddress: [],
    shippingAddress: [],
  })
  const [cities, setCities] = useState({
    billingAddress: [],
    shippingAddress: [],
  })

  useEffect(() => {
    const { statesData, citiesData } = loadStatesAndCities(countries)
    setStates(statesData)
    setCities(citiesData)
  }, [])

  const handleChange = (e, type) => {
    const { name, value } = e.target
    if (name === 'country') {
      const selectedCountry = countries.find((c) => c.isoCode === value)

      setAddresses((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          country: selectedCountry,
          province: '',
          canton: '',
        },
      }))
    } else if (name === 'province') {
      const selectedProvince = states[addresses[type].country.isoCode].find(
        (p) => p.isoCode === value
      )

      setAddresses((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          province: selectedProvince,
          canton: '',
        },
      }))
    } else if (name === 'canton') {
      setAddresses((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          canton: value,
        },
      }))
    } else {
      setAddresses((prev) => ({
        ...prev,
        [type]: { ...prev[type], [name]: value },
      }))
    }
  }

  const handleSave = (type) => {
    alert(
      `Dirección de ${
        type === 'billingAddress' ? 'Facturación' : 'Envío'
      } guardada correctamente.`
    )
    setOriginalAddresses((prev) => ({
      ...prev,
      [type]: addresses[type],
    }))
  }

  const handleCancel = (type) => {
    setAddresses((prev) => ({
      ...prev,
      [type]: originalAddresses[type],
    }))
    alert('Cambios revertidos a su estado inicial.')
  }

  const hasChanges = (type) => {
    return (
      JSON.stringify(addresses[type]) !==
      JSON.stringify(originalAddresses[type])
    )
  }

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

  return (
    <Container>
      <header>
        <BackButton onClick={handleGoBack} />
        <TitleH2>Editar Mis Direcciones</TitleH2>
      </header>

      <Wrapper>
        {['billingAddress', 'shippingAddress'].map((type) => (
          <Form key={type}>
            <SectionTitle>
              {type === 'billingAddress'
                ? 'Dirección de Facturación '
                : 'Dirección de Envío '}
            </SectionTitle>
            {Object.keys(addresses[type]).map((field) => {
              if (field === 'country') {
                return (
                  <InputGroup
                    key={field}
                    as='select'
                    label={fieldLabels[field]}
                    name={field}
                    value={addresses[type]?.country?.isoCode || ''}
                    onChange={(e) => handleChange(e, type)}
                    options={countries.map((c) => ({
                      name: c.name,
                      value: c.isoCode,
                    }))}
                  />
                )
              }
              if (field === 'province') {
                const countryCode = addresses[type]?.country?.isoCode
                return (
                  <InputGroup
                    key={field}
                    as='select'
                    label={fieldLabels[field]}
                    name={field}
                    value={addresses[type].province?.isoCode || ''}
                    onChange={(e) => handleChange(e, type)}
                    options={states[countryCode]?.map((s) => ({
                      name: s.name,
                      value: s.isoCode,
                    }))}
                  />
                )
              }
              if (field === 'canton') {
                const provinceCode = addresses[type]?.province?.isoCode
                return (
                  <InputGroup
                    key={field}
                    as='select'
                    label={fieldLabels[field]}
                    name={field}
                    value={addresses[type]?.canton || ''}
                    onChange={(e) => handleChange(e, type)}
                    options={cities[provinceCode]?.map((c) => ({
                      name: c.name,
                      value: c.name,
                    }))}
                  />
                )
              }
              return (
                <InputGroup
                  key={field}
                  name={field}
                  label={fieldLabels[field]}
                  value={addresses[type][field]}
                  onChange={(e) => handleChange(e, type)}
                />
              )
            })}
            <WrapperButton>
              <Button
                title={`Cancelar ${
                  type === 'billingAddress' ? 'Facturación' : 'Envío'
                }`}
                $canceled
                disabled={!hasChanges(type)}
                onClick={() => handleCancel(type)}
              >
                Cancelar
              </Button>
              <Button
                title={`Guardar ${
                  type === 'billingAddress' ? 'Facturación' : 'Envío'
                }`}
                $save
                disabled={!hasChanges(type)}
                onClick={() => handleSave(type)}
              >
                Guardar
              </Button>
            </WrapperButton>
          </Form>
        ))}
      </Wrapper>
    </Container>
  )
}

export default MyAddress
