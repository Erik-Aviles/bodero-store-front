import { getServerSession } from "next-auth";
import { Customer } from "@/models/schemas/Customer";
import { mongooseConnect } from "@/lib/mongoose";
import { authOptions } from "../auth/[...nextauth]";

// Controlador para gestionar direcciones
export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  // Verificar si el usuario está autenticado
  if (!session || !session.user) {
    return res.status(401).json({ message: "No autorizado" });
  }

  const customerId = session.user._id;

  // Función para convertir campos específicos a minúsculas
  const normalizeFields = (address) => {
    if (address.name) address.name = address.name.toLowerCase();
    if (address.lastname) address.lastname = address.lastname.toLowerCase();
    if (address.email) address.email = address.email.toLowerCase();
    if (address.streetAddress)
      address.streetAddress = address.streetAddress.toLowerCase();
  };

  if (req.method === "GET") {
    try {
      await mongooseConnect(); // Conectar a la base de datos

      // Buscar el usuario en la base de datos
      const customer = await Customer.findById(customerId);

      if (!customer) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const result = {
        billingAddress: {
          name: customer.billingAddress?.name || "",
          lastname: customer.billingAddress?.lastname || "",
          email: customer.billingAddress?.email || "",
          idDocument: customer.billingAddress?.idDocument || "",
          phone: customer.billingAddress?.phone || "",
          country: customer.billingAddress?.country || "",
          province: customer.billingAddress?.province || "",
          canton: customer.billingAddress?.canton || "",
          streetAddress: customer.billingAddress?.streetAddress || "",
          postal: customer.billingAddress?.postal || "",
        },
        shippingAddress: {
          name: customer.shippingAddress?.name || "",
          lastname: customer.shippingAddress?.lastname || "",
          email: customer.shippingAddress?.email || "",
          idDocument: customer.shippingAddress?.idDocument || "",
          phone: customer.shippingAddress?.phone || "",
          country: customer.shippingAddress?.country || "",
          province: customer.shippingAddress?.province || "",
          canton: customer.shippingAddress?.canton || "",
          streetAddress: customer.shippingAddress?.streetAddress || "",
          postal: customer.shippingAddress?.postal || "",
        },
      };

      return res.status(200).json(result);
    } catch (error) {
      console.error("Error al obtener las direcciones:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  if (req.method === "POST") {
    // Crear nuevas direcciones para el usuario
    const { type, address } = req.body;

    // Validar el tipo de dirección
    if (!["billingAddress", "shippingAddress"].includes(type)) {
      return res.status(400).json({ message: "Tipo de dirección no válido" });
    }

    // Validar campos obligatorios
    const requiredFields = [
      "name",
      "lastname",
      "email",
      "country",
      "province",
      "canton",
      "streetAddress",
      "postal",
      "idDocument",
      "phone",
    ];

    const missingFields = requiredFields.filter((field) => !address[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Faltan campos obligatorios: ${missingFields.join(", ")}`,
      });
    }
    await mongooseConnect();

    normalizeFields(address);

    // Añadir la dirección en la base de datos
    const updatedUser = await Customer.findByIdAndUpdate(
      customerId,
      { $set: { [type]: address } },
      { new: true, upsert: true }
    );

    return res.status(201).json({
      message: `Dirección de ${
        type === "billingAddress" ? "facturación" : "envío"
      }, creada correctamente`,
      [type]: updatedUser[type],
    });
  }

  if (req.method === "PUT") {
    // Actualizar direcciones del usuario
    const { type, address } = req.body;

    // Validar el tipo de dirección
    if (!["billingAddress", "shippingAddress"].includes(type)) {
      return res.status(400).json({ message: "Tipo de dirección no válido" });
    }

    // Validar campos obligatorios
    const requiredFields = [
      "name",
      "lastname",
      "email",
      "country",
      "province",
      "canton",
      "streetAddress",
      "postal",
      "idDocument",
      "phone",
    ];

    const missingFields = requiredFields.filter((field) => !address[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Faltan campos obligatorios: ${missingFields.join(", ")}`,
      });
    }

    normalizeFields(address);

    // Actualizar dirección en la base de datos
    const updatedUser = await Customer.findByIdAndUpdate(
      customerId,
      { [type]: address },
      { new: true }
    );

    return res.status(200).json({
      message: `Dirección de ${
        type === "billingAddress" ? "facturación" : "envío"
      }, modificado correctamente`,
      [type]: updatedUser[type],
    });
  }

  // Método no permitido
  res.setHeader("Allow", ["POST", "PUT", "GET"]);
  return res.status(405).end(`Método ${req.method} no permitido`);
}
