export const generateOrderNumber = (existingOrder) => {
  const date = new Date();
  const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;

  const randomCode = Math.floor(10000 + Math.random() * 90000); // Código aleatorio de 5 dígitos
  const orderNumber = `brd-${formattedDate}-${randomCode}`;

  // Verificar que sea único en la base de datos
  if (existingOrder) {
    return generateOrderNumber(); // Si ya existe, generar uno nuevo
  }

  return orderNumber;
};
