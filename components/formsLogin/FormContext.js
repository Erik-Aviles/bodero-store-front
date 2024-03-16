import { createContext, useState } from "react";
import styled from "styled-components";
import { Input } from "./Input";
import { Footer } from "./Footer";
import { SubmitButton } from "./SubmitButton";
import { TextArea } from "./TextArea";

const FormWrapper = styled.form`
  padding: 1.3rem;
  border: 0.5px solid #878787;
  border-radius: 10px;
  min-width: 300px;
  margin: 20px 0;
`;
const DespContainer = styled.div`
  text-align: left;
  h2 {
    margin: 0;
    font-weight: 700;
    font-size: 1.2rem;
  }
  p {
    margin-top: 0;
    font-weight: 400;
    font-size: 0.8rem;
  }
`;

const formValues = {};

export const FormContext = createContext(formValues || undefined);

export function FormContextProvider({
  title,
  description,
  onSubmit,
  children,
}) {
  const [formValues, setFormValues] = useState({});

  const handleSutmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <FormContext.Provider value={{ formValues, setFormValues }}>
      <FormWrapper onSubmit={handleSutmit}>
        <DespContainer>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </DespContainer>
        {children}
      </FormWrapper>
    </FormContext.Provider>
  );
}

FormContextProvider.Input = Input;
FormContextProvider.TextArea = TextArea;
FormContextProvider.Footer = Footer;
FormContextProvider.SubmitButton = SubmitButton;
