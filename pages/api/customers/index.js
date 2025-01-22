import { mongooseConnect } from "@/lib/mongoose";
import { Customer } from "@/models/schemas/Customer";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  await mongooseConnect();

  const session = await getServerSession(req, res, authOptions);

  // Verificar si el usuario está autenticado
  if (!session || !session.user) {
    return res.status(401).json({ message: "No autorizado" });
  }

  const customerId = session.user._id;

  if (req.method === "GET") {
    try {
      const customer = await Customer.findById(customerId).select(
        "-orders -cart -shippingAddress -billingAddress"
      );
      if (!customer) {
        return res.status(404).json({ error: "Cliente no encontrado." });
      }

      return res.status(200).json(customer);
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener el cliente." });
    }
  }

  return res.status(405).json({ error: "Método no permitido." });
}
