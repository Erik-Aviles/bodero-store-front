import Button from "@/components/Button";
import Categories from "@/components/Categories";
import Center from "@/components/Center";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import axios from "axios";
import Head from "next/head";
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

export default function RegisterPage({ categories }) {
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
    <>
      <Head>
        <title>B.R.D | Crear cuenta</title>
      </Head>
      <Categories categories={categories} />
      <Center>
        <Title>Crear cuenta</Title>
        <p>
          ¿No tienes cuenta? Ingresa un correo y una contraseña para crearte una
          nueva cuenta y guardar todas tus preferencias y poder ver el listado
          de tus pedidos.
        </p>
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
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const categories = await Category.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
