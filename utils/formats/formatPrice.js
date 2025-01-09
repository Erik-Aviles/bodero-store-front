const formatPrice = (value) => {
  let precioFormateado = new Intl.NumberFormat("es-EC", {
    style: "currency",
    currency: "USD",
  }).format(value);
  return precioFormateado;
};

export default formatPrice;
