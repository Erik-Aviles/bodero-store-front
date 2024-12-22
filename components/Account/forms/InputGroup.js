import React from 'react'
import styled, { css } from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css'
import { blue, primary } from '@/lib/colors'
import {
  ArrowDownIcon,
  EyeFilledIcon,
  EyeSlashFilledIcon,
} from '@/components/Icons'
import { capitalize } from '@/utils/capitalize'

const InputGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  gap: 5px;

  label {
    font-size: 0.75rem;
    font-weight: 400;
    color: #9199a0;
  }
  span {
    color: ${primary};
    font-size: 12px;
  }
  select,
  input {
    outline: none;
    background: none;
    width: 100%;
    font-size: 0.75rem;
    border-radius: 5px;
    height: 35px;
    border: 1px solid #ccc;
    padding: 5px 10px 4px;
    background-clip: padding-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
    &:focus {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
      outline: none;
    }
  }
  select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding-right: 40px;
    color: #333;
    cursor: pointer;
    &::-ms-expand {
      display: none;
    }
  }
`
const iconStyles = css`
  position: absolute;
  right: 10px;
  color: ${blue};
  cursor: pointer;
  width: 20px;
  height: 18px;
  top: 28px;
`

const ArrowDown = styled(ArrowDownIcon)`
  position: absolute;
  right: 10px;
  color: ${blue};
  cursor: pointer;
  pointer-events: none;
  top: 28px;
`

const Eye = styled(EyeFilledIcon)`
  ${iconStyles}
`

const EyeSlash = styled(EyeSlashFilledIcon)`
  ${iconStyles}
`

const InputGroup = ({
  required = false,
  label,
  type = 'text',
  name,
  value = '',
  onChange,
  placeholder,
  options = [],
  isPassword = false,
  isVisiblePass,
  toggleVisibility,
  as = 'input',
  ...rest
}) => {
  return (
    <InputGroupWrapper>
      {label && (
        <label htmlFor={name}>
          {capitalize(label)} {required && <span>*</span>}
        </label>
      )}
      {/* Input o Select */}
      {as === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          title={label}
          onChange={onChange}
          {...rest}
        >
          <option value=''>Selecciona una opción</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {capitalize(option.name)}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          title={label}
          onChange={onChange}
          placeholder={placeholder}
          {...rest}
        />
      )}
      {/* Íconos Condicionales */}
      {as === 'select' && <ArrowDown />}
      {isPassword &&
        (isVisiblePass ? (
          <EyeSlash onClick={toggleVisibility} />
        ) : (
          <Eye onClick={toggleVisibility} />
        ))}
    </InputGroupWrapper>
  )
}

export default InputGroup
