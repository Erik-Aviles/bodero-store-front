import * as React from "react";

const style = {
  container: {
    padding: "20px",
    backgroundColor: "white",
    display: "grid",
    justifyItems: "center",
  },
  text: {
    margin: 0,
    borderBottom: "1px",
  },
};

export const EmailTemplate = ({
  name,
  email,
  phone,
  city,
  country,
  message,
}) => (
  <div style={style.container}>
    <p style={style.text}>
      <strong>Nombre: </strong>
      {name}
    </p>
    <p style={style.text}>
      <strong>Correo: </strong>
      {email}
    </p>
    <p style={style.text}>
      <strong>Celular: </strong>
      {phone}
    </p>
    <p style={style.text}>
      <strong>Ciudad: </strong>
      {city}
    </p>
    <p style={style.text}>
      <strong>País: </strong>
      {country}
    </p>
    <p style={style.text}>
      <strong>Mensaje: </strong>
      {message}
    </p>
  </div>
);
