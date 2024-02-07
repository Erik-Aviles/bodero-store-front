import * as React from "react";

const style = {
  container: {
    padding: "20px",
    backgroundColor: "white",
    display: "grid",
    justifyItems: "center",
  },
  txsmal: {
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
    <p style={style.txsmal}>
      <strong>Nombre: </strong>
      {name}
    </p>
    <p style={style.txsmal}>
      <strong>Correo: </strong>
      {email}
    </p>
    <p style={style.txsmal}>
      <strong>Celular: </strong>
      {phone}
    </p>
    <p style={style.txsmal}>
      <strong>Ciudad: </strong>
      {city}
    </p>
    <p style={style.txsmal}>
      <strong>País: </strong>
      {country}
    </p>
    <p style={style.txsmal}>
      <strong>Mensaje: </strong>
      {message}
    </p>
  </div>
);
