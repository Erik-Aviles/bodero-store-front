import axios from "axios";
import Swal from "sweetalert2";

// Función para crear una orden
export const handleCreateOrder = async ({
  name,
  lastname,
  email,
  idDocument,
  phone,
  country,
  province,
  city,
  streetAddress,
  postal,
  cartProducts,
  clearCart, 
}) => {
  try {
    // Validar campos obligatorios antes de enviar la solicitud
    if (
      !name ||
      !lastname ||
      !email ||
      !idDocument ||
      !phone ||
      !country ||
      !province ||
      !city ||
      !streetAddress
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos obligatorios.",
      });
      return;
    }

    // Validar que el carrito no esté vacío
    if (!cartProducts || cartProducts.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Carrito vacío",
        text: "No puedes crear un pedido sin productos.",
      });
      return;
    }

    // Mostrar mensaje de carga
    Swal.fire({
      title: "Creando pedido...",
      text: "Por favor, espera un momento.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Enviar solicitud al servidor
    const response = await axios.post("/api/order", {
      name,
      lastname,
      email,
      idDocument,
      phone,
      country,
      province,
      city,
      streetAddress,
      postal,
      cartProducts,
    });

    // Verificar la respuesta del servidor
    if (response.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Pedido creado",
        text: "Tu pedido se ha creado exitosamente.",
      });

      // Limpiar carrito después de crear la orden
      clearCart();
    } else {
      throw new Error(response.data.message || "Error al crear el pedido.");
    }
  } catch (error) {
    console.error("Error al crear la orden:", error);

    // Mostrar mensaje de error
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.message || "Ocurrió un error inesperado.",
    });
  }
};
