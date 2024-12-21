import { blue, primary } from '@/lib/colors'
import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { Country, State, City } from 'country-state-city'
import { customerInfo } from '../../resource/curtomerData'
import InputGroup from './forms/InputGroup'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  h2 {
    color: ${blue};
    margin: 0;
    font-weight: 400;
  }
`

const AddressContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 15px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`

const AddressBox = styled.div`
  border: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 400px;
  min-width: 200px;
  border: 1px solid #e9ecef;
  padding: 15px;
  border-radius: 8px;
  background-color: #f8f9fa;
  h4 {
    margin: 10px 0;
    font-weight: 300;
    color: ${blue};
    border-bottom: 2px solid #ccc; /* Línea divisoria */
    padding-bottom: 8px;
  }
  .botton-box {
    display: flex;
    justify-content: space-evenly;
    gap: 10px;
  }
`

const Button = styled.button`
  padding: 10px;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  ${(props) =>
    props.$canceled &&
    css`
      background-color: ${primary};
      transition: background-color 0.3s ease;
      &:hover {
        background-color: rgba(247, 3, 1, 0.6);
      }
      &:disabled {
        background-color: rgba(247, 3, 1, 0.4);
        cursor: not-allowed;
      }
    `};
  ${(props) =>
    props.$save &&
    css`
      background-color: ${blue};
      transition: background-color 0.3s ease;

      &:hover {
        background-color: rgba(0, 91, 181, 0.8);
      }
      &:disabled {
        background-color: rgba(0, 91, 181, 0.5);
        cursor: not-allowed;
      }
    `};
`

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

  const countries = [{ name: 'Ecuador', isoCode: 'EC' }]

  useEffect(() => {
    const loadStatesAndCities = () => {
      const statesData = {}
      const citiesData = {}

      countries.forEach((country) => {
        const countryStates = State.getStatesOfCountry(country.isoCode)
        statesData[country.isoCode] = countryStates

        countryStates.forEach((state) => {
          citiesData[state.isoCode] = City.getCitiesOfState(
            country.isoCode,
            state.isoCode
          )
        })
      })

      setStates(statesData)
      setCities(citiesData)
    }

    loadStatesAndCities()
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
          province: '', // Reinicia provincia
          canton: '', // Reinicia cantón
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
          canton: '', // Reinicia cantón
        },
      }))
    } else if (name === 'canton') {
      setAddresses((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          canton: value, // Actualiza solo el cantón
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
      <h2>Editar Mis Direcciones</h2>
      <AddressContainer>
        {['billingAddress', 'shippingAddress'].map((type) => (
          <AddressBox key={type}>
            <h4>
              {type === 'billingAddress'
                ? 'Dirección de Facturación '
                : 'Dirección de Envío '}
            </h4>
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
            <div className='botton-box'>
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
            </div>
          </AddressBox>
        ))}
      </AddressContainer>
    </Container>
  )
}

export default MyAddress
