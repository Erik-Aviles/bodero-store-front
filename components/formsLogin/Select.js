import { useContext } from 'react'
import { FormContext } from './FormContext'
import styled from 'styled-components'
import { Country, State, City } from 'country-state-city'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  label {
    font-size: 0.75rem;
    font-weight: 400;
    color: #9199a0;
  }
  select {
    appearance: none;
    -webkit-appearance: none; /* Para Safari */
    -moz-appearance: none; /* Para Firefox */
    padding: 10px 40px 10px 10px;
    color: #333;
    outline: none;
    background: none;
    width: 100%;
    font-size: 0.75rem;
    border-radius: 5px;
    height: 35px;
    border: 1px solid #ccc;
    background-clip: padding-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra sutil */
    transition: box-shadow 0.3s ease;
    cursor: pointer;

    /* Asegura que el texto no se superponga con el ícono */
    &::-ms-expand {
      display: none; /* Oculta el ícono en IE/Edge */
    }

    &:focus {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15); /* Sombra un poco más destacada en foco */
      outline: none;
    }
  }
`

export function Select({ required = false, label, name, placeholder, data }) {
  const { formValues, setFormValues } = useContext(FormContext)

  const handleChange = (e) => {
    const { value } = e.target
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const countries = Country.getAllCountries()
  const ecuador = countries.find((country) => country.name === 'Ecuador')
  const getStates = (countryCode) => State.getStatesOfCountry(countryCode)
  const getCities = (stateCode, countryCode) =>
    City.getCitiesOfState(stateCode, countryCode)

  return (
    <Container>
      {label && (
        <label htmlFor={name}>
          {label} {required === true && <span>*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        required={required}
        value={formValues[name] || ''}
        onChange={handleChange}
        placeholder={ttle}
      >
        <option value=''>Seleccionar {label}</option>
        {data?.map((item) => (
          <option key={item?.name} value={item?.name}>
            {item?.name}
          </option>
        ))}
      </select>
    </Container>
  )
}
