import { blue, primary } from '@/lib/colors'
import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { Country, State, City } from 'country-state-city'

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

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 0.75rem;
    font-weight: 400;
    color: #9199a0;
  }

  input,
  select {
    outline: none;
    background: none;
    width: 100%;
    font-size: 14px;
    border-radius: 5px;
    height: 35px;
    padding: 5px 10px 4px;
    border: 1px solid #ccc;
    background-clip: padding-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra sutil */
    transition: box-shadow 0.3s ease;
    &:focus {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15); /* Sombra un poco más destacada en foco */
      outline: none;
    }
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
    billingAddress: {
      fullName: 'John Doe',
      email: 'johndoe@example.com',
      country: 'Costa Rica',
      province: 'San José',
      canton: 'Central',
      postal: '120310',
      address: '123 Main Street',
      phone: '+123456789',
    },
    shippingAddress: {
      fullName: 'John Doe',
      email: 'johndoe@example.com',
      country: 'Costa Rica',
      province: 'Alajuela',
      canton: 'Central',
      postal: '120310',
      address: '456 Elm Street',
      phone: '+987654321',
    },
  }

  const [addresses, setAddresses] = useState(initialAddresses)
  const [originalAddresses, setOriginalAddresses] = useState(initialAddresses)

  const handleChange = (e, type) => {
    const { name, value } = e.target
    setAddresses({
      ...addresses,
      [type]: { ...addresses[type], [name]: value },
    })
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
  }

  const hasChanges = (type) => {
    return (
      JSON.stringify(addresses[type]) !==
      JSON.stringify(originalAddresses[type])
    )
  }

  const fieldLabels = {
    fullName: 'Nombre Completo',
    email: 'Correo',
    country: 'País',
    province: 'Provincia',
    canton: 'Cantón',
    address: 'Dirección',
    postal: 'Código Postal',
    phone: 'Teléfono',
  }

  const countries = Country.getAllCountries()
  const getStates = (countryCode) => State.getStatesOfCountry(countryCode)
  const getCities = (stateCode, countryCode) =>
    City.getCitiesOfState(stateCode, countryCode)

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
            {Object.keys(addresses[type]).map((field) => (
              <InputGroup key={field}>
                <label htmlFor={`${type}-${field}`}>{fieldLabels[field]}</label>
                {field === 'country' ? (
                  <select
                    id={`${type}-${field}`}
                    name={field}
                    value={addresses[type][field]}
                    onChange={(e) => handleChange(e, type)}
                  >
                    <option value=''>Seleccione un país</option>
                    {countries.map((country) => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                ) : field === 'province' ? (
                  <select
                    id={`${type}-${field}`}
                    name={field}
                    value={addresses[type][field]}
                    onChange={(e) => handleChange(e, type)}
                  >
                    <option value=''>Seleccione una provincia</option>
                    {getStates(addresses[type].country).map((state) => (
                      <option key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                ) : field === 'canton' ? (
                  <select
                    id={`${type}-${field}`}
                    name={field}
                    value={addresses[type][field]}
                    onChange={(e) => handleChange(e, type)}
                  >
                    <option value=''>Seleccione un cantón</option>
                    {getCities(
                      addresses[type].province,
                      addresses[type].country
                    ).map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={`${type}-${field}`}
                    name={field}
                    value={addresses[type][field]}
                    onChange={(e) => handleChange(e, type)}
                  />
                )}
              </InputGroup>
            ))}
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
