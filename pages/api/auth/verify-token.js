import { Customer } from "@/models/schemas/Customer";
import { mongooseConnect } from "@/lib/mongoose";
import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }
  try {
    const { token } = req.body;

    // Validar que el token esté presente
    if (!token) {
      return res.status(400).json({ message: "El token es requerido." });
    }

    await mongooseConnect();

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const customer = await Customer.findOne({ resetToken: hashedToken });
    /*     const customer = await Customer.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: Date.now() },
    }); */

    if (!customer) {
      return res.status(401).json({ message: "Token es invalido!" });
    }

    if (customer.resetTokenExpiry < Date.now()) {
      return res.status(401).json({ message: "El enlace para restablecer tu contraseña ha expirado. Por favor, solicita uno nuevo" });
    }

    return res.status(200).json({
      customer,
      message:
        "Redirigiendo a restablecer tu contraseña!",
    });
  } catch (error) {
    console.error("Error al verificar el token:", error);

    return res.status(500).json({
      message: "Error interno del servidor. Por favor, inténtalo más tarde.",
    });
  }
}
