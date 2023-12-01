import { useContext } from "react";
import { FormContext } from "./FormContext";
import styled from "styled-components";
import { black } from "@/lib/colors";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  label {
    font-size: 14px;
    font-weight: 600;
  }
  input {
    padding: 0.6rem 1rem;
    border: 0.5px solid #878787;
    font-size: 0.7rem;
    border-radius: 6px;
    transition-duration: 0.3s;
    outline: 0.55px solid transparent;
    &:focus {
      outline: 1.5px solid ${black};
    }
  }
`;

export function Input({ label, type, name, placeholder }) {
  const { formValues, setFormValues } = useContext(FormContext);

  const handleChange = (e) => {
    const { value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <InputContainer>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={formValues[name] || ""}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </InputContainer>
  );
}
