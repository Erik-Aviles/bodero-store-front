import { createContext, useState } from "react";
import styled from "styled-components";
import { Input } from "./Input";
import { Footer } from "./Footer";
import { SubmitButton } from "./SubmitButton";
import { TextArea } from "./TextArea";
import Image from "next/image";
import logo from "../../public/logoSimbolo.jpg";
const FormWrapper = styled.form`
  padding: 1.3rem;
  border-radius: 10px;
  min-width: 300px;
  margin: 20px 0;
  box-shadow: 1px 4px 20px rgb(0 0 0 / 50%);
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
const Imagen = styled.figure`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0 0 20px;
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
        <Imagen>
          <Image
            alt="Logo de la empresa con banderitas"
            src={logo}
            width={673 / 4}
            height={286 / 4}
          />
        </Imagen>
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
