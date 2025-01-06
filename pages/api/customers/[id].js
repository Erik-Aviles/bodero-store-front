import { mongooseConnect } from "@/lib/mongoose";
import { Customer } from "@/models/schemas/Customer";

export default async function handler(req, res) {
  await mongooseConnect();

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const customer = await Customer.findById(id);
      if (!customer) {
        return res.status(404).json({ error: "Cliente no encontrado." });
      }
      return res.status(200).json(customer);
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener el cliente." });
    }
  }

  if (req.method === "PUT") {
    try {
      const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json(updatedCustomer);// Actualizar cliente
    } catch (error) {
      return res.status(400).json({ error: "Error al actualizar cliente." });
    }
  }

  if (req.method === "DELETE") {
    try {
      await Customer.findByIdAndDelete(id); // Eliminar cliente
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: "Error al eliminar cliente." });
    }
  }

  return res.status(405).json({ error: "Método no permitido." });
}