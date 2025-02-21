import { createContext, useState } from "react";
import cloudinaryLoader from "../loaderes/cloudinaryLoader";
import localLoader from "../loaderes/localLoader";
import { SubmitButton } from "./SubmitButton";
import { useData } from "@/hooks/useData";
import styled from "styled-components";
import { TextArea } from "./TextArea";
import { Footer } from "./Footer";
import { Input } from "./Input";
import Image from "next/image";

const FormWrapper = styled.form`
  padding: 1.3rem;
  border-radius: 10px;
  min-width: 300px;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
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
  margin: 0 0 10px;
`;

const formValues = {};

export const FormContext = createContext(formValues || undefined);

export function FormContextProvider({
  title,
  description,
  onSubmit,
  children,
}) {
  const { company } = useData();
  const { mainlogo } = company || {};

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
            loader={mainlogo ? cloudinaryLoader : localLoader}
            src={mainlogo}
            width={673 / 4}
            height={286 / 4}
            alt="Logo de la empresa con banderitas"
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
