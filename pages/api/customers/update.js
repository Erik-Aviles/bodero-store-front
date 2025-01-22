import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { mongooseConnect } from "@/lib/mongoose";
import { Customer } from "@/models/schemas/Customer";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {

      // Obtener la sesión del usuario autenticado
      const session = await getServerSession(req, res, authOptions);

      if (!session) {
        return res.status(401).json({ error: "No autorizado" });
      }

      const { user } = session;
      const { idDocument, name, lastname, email, phone, dateOfBirth, gender } =
        req.body;

      await mongooseConnect();

      // Buscar al cliente en la base de datos
      const updatedCustomer = await Customer.findOneAndUpdate(
        { email: user.email }, // Filtrar por email (único)
        {
          $set: {
            idDocument,
            name: name.toLowerCase(),
            lastname: lastname.toLowerCase(),
            email,
            phone,
            dateOfBirth,
            gender: gender.toLowerCase(),
          },
        }
      );

      if (!updatedCustomer) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }

      // Validar si el correo se ha actualizado
      if (email && email !== updatedCustomer.email) {
        const emailExists = await Customer.findOne({ email });
        if (emailExists) {
          return res.status(400).json({ error: "El correo ya está en uso." });
        }
        updatedCustomer.email = email;
      }

      // Responder con los datos actualizados
      return res.status(200).json({
        success: true,
        message: "Datos actualizados correctamente",
      });
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    // Método no permitido
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
