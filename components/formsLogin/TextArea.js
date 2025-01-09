import { useContext } from 'react'
import { FormContext } from './FormContext'
import styled from 'styled-components'
import { primary } from '@/lib/colors'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  span {
    color: ${primary};
    font-size: 12px;
  }
  label {
    font-size: 0.75rem;
    font-weight: 400;
    color: #9199a0;
  }
  textarea {
    outline: none;
    background: none;
    min-height: 60px;
    padding: 0.6rem;
    border: 1px solid #ccc;
    font-size: 0.75rem;
    border-radius: 5px;
    background-clip: padding-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra sutil */
    transition: box-shadow 0.3s ease;
    &:focus {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15); /* Sombra un poco más destacada en foco */
      outline: none;
    }
  }
`

export function TextArea({ required = false, label, name, placeholder }) {
  const { formValues, setFormValues } = useContext(FormContext)

  const handleChange = (e) => {
    const { value } = e.target
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  return (
    <Container>
      {label && (
        <label htmlFor={name}>
          {label} {required === true && <span>*</span>}
        </label>
      )}
      <textarea
        required={required}
        id={name}
        name={name}
        value={formValues[name] || ''}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </Container>
  )
}
