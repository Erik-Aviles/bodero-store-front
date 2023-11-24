import React, { useState } from "react";
import styled from "styled-components";
import Input from "./Input";
import { success, white } from "@/lib/colors";
import Button from "./Button";

const Box = styled.div`
  background-color: ${white};
  border-radius: 10px;
  padding: 20px;
  label {
    font-size: 0.8rem;
  }
  textarea {
    max-width: 415px;
    min-width: 415px;
    min-height: 60px;
    &:focus {
      border-color: ${success};
      box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075) inset,
        0 0 8px rgba(0, 128, 0, 0.6);
      outline: 0 none;
    }
  }
`;

export default function FormContact() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <Box>
      <Input
        type="text"
        placeholder="Nombre"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Apellido"
        name="lastname"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Correo"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Teléfono"
        name="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Ciudad"
        name="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <Input
        type="text"
        placeholder="País"
        name="country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <label>
        Con el fin de brindar una atención personalizada, nos gustaría que nos
        cuente sobre su inquietud y cuál es el producto de su interés.
      </label>
      <textarea />
      <Button block={1} black={1}>
        Quiero ser contactado
      </Button>
    </Box>
  );
}
