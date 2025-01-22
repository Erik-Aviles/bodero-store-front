import { Customer } from "@/models/schemas/Customer";
import { mongooseConnect } from "@/lib/mongoose";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }
  const { email, password, confirmpassword } = req.body;
  await mongooseConnect();

  if (!password && !confirmpassword) {
    return res
      .status(400)
      .json({ message: "Las contraseñas son obligatorias" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Las contraseñas debe tener al menos 6 caracteres" });
  }

  if (password !== confirmpassword) {
    return res.status(400).json({ message: "Las contraseñas no coinciden" });
  }

  const existingCustomer = await Customer.findOne({ email });
  
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  existingCustomer.password = hashedPassword;
  existingCustomer.resetToken = undefined;
  existingCustomer.resetTokenExpiry = undefined;

  try {
    await existingCustomer.save();
    return res.status(200).json({
      message: "La contraseña se guardó de manera exitosa!",
    });
  } catch (error) {
    console.error("Error al registrar:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
