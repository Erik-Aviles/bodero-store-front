import { useContext } from 'react'
import { FormContext } from './FormContext'
import styled from 'styled-components'
import { black, primary } from '@/lib/colors'

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  span {
    color: ${primary};
    font-size: 12px;
  }
  label {
    font-size: 0.75rem;
    font-weight: 400;
    color: #9199a0;
  }
  input {
    outline: none;
    background: none;
    width: 100%;
    font-size: 14px;
    border-radius: 5px;
    padding: 5px 10px 4px;
    height: 35px;
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

export function Input({
  required = false,
  label,
  type = 'text',
  name,
  placeholder,
}) {
  const { formValues, setFormValues } = useContext(FormContext)

  const handleChange = (e) => {
    const { value } = e.target
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  return (
    <InputContainer>
      {label && (
        <label htmlFor={name}>
          {label} {required === true && <span>*</span>}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        required={required}
        value={formValues[name] || ''}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </InputContainer>
  )
}
