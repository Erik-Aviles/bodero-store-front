export const calcularTotal = (lineItems) => {
  if (!Array.isArray(lineItems)) {
    return null;
  }
  return lineItems?.reduce(
    (total, pro) => total + (pro.info_order?.unit_amount || 0), // Asegura que unit_amount sea un número válido
    0
  );
};

export const calcularQuantity = (lineItems) => {
  if (!Array.isArray(lineItems)) {
    return null; 
  }
  return lineItems?.reduce(
    (total, pro) => total + (pro?.quantity || 0), // Asegura que quantity sea un número válido
    0
  );
};