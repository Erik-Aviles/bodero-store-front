import Button from "@/components/Button";
import Center from "@/components/Center";
import Title from "@/components/Title";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

const StylesWrapper = styled.div`
  margin: 0 auto;
`;
const StylesForm = styled.form`
  margin: 0 auto;
  max-width: 300px;
  padding: 60px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/api/auth/login", credentials);
    console.log(response);
  };

  return (
    <Center>
      <Title>Inicia sesión en tu cuenta</Title>
      <h3>
        No tienes una cuenta? <Link href={"/register"}>Únete</Link>
      </h3>
      <StylesForm onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirmar contraseña"
          onChange={handleChange}
        />
        <Button primary={1}>Entrar</Button>
      </StylesForm>
    </Center>
  );
}
