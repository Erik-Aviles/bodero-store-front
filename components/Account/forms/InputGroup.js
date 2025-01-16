import React from "react";
import styled, { css } from "styled-components";
import { blue, primary } from "@/lib/colors";
import {
  ArrowDownIcon,
  EyeFilledIcon,
  EyeSlashFilledIcon,
} from "@/components/Icons";
import { capitalize } from "@/utils/formats/capitalize";
import { RequiredText } from "@/components/stylesComponents/ComponentAccount";

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
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    border: 2px solid ${blue};
    border-radius: 2px;
    background: none;
    cursor: pointer;
    transition: background-color 0.3s ease, border-color 0.3s ease;

    &:checked {
      background-color: ${blue};
      border-color: ${blue};
    }
      &::after {
        content: "";
        position: absolute;
        top: 2px;
        left: 5px;
        width: 6px;
        height: 6px;
        background-color: white;
        border-radius: 2px;
      }
    }
  }

  label {
    font-size: 0.75rem;
    color: #333;
    cursor: pointer;
  }
`;

const iconStyles = css`
  position: absolute;
  right: 10px;
  color: ${blue};
  cursor: pointer;
  width: 20px;
  height: 18px;
  top: 32px;
`;

const ArrowDown = styled(ArrowDownIcon)`
  position: absolute;
  right: 12px;
  color: ${blue};
  cursor: pointer;
  pointer-events: none;
  top: 33px;
`;

const Eye = styled(EyeFilledIcon)`
  ${iconStyles}
`;

const EyeSlash = styled(EyeSlashFilledIcon)`
  ${iconStyles}
`;

const InputGroup = ({
  required = false,
  label,
  type = "text",
  name,
  value = "",
  onChange,
  placeholder,
  options = [],
  isPassword = false,
  isVisiblePass,
  toggleVisibility,
  as = "input",
  isChecked = false,
  showCheckbox = false, // Corregido el nombre del prop
  ...rest
}) => {
  return (
    <InputGroupWrapper>
      {label && type !== "checkbox" && (
        <label htmlFor={name}>
          {capitalize(label)} {required && <RequiredText>*</RequiredText>}
        </label>
      )}
      {/* Input o Select */}
      {as === "select" && (
        <select
          id={name}
          name={name}
          value={value}
          title={label}
          onChange={onChange}
          {...rest}
        >
          <option value="">Selecciona una opción</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {capitalize(option.name)}
            </option>
          ))}
        </select>
      )}
      {/* Íconos Condicionales */}
      {as === "select" && <ArrowDown />}
      {isPassword &&
        (isVisiblePass ? (
          <EyeSlash onClick={toggleVisibility} />
        ) : (
          <Eye onClick={toggleVisibility} />
        ))}
      {type === "checkbox" && showCheckbox && (
        <CheckboxWrapper>
          <input
            type={type}
            id={name}
            checked={isChecked}
            onChange={onChange}
          />
          <label htmlFor={name}>{label}</label>
        </CheckboxWrapper>
      )}
      {type !== "checkbox" && as !== "select" &&(
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
    </InputGroupWrapper>
  );
};

export default InputGroup;
