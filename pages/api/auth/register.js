import bcrypt from "bcryptjs";
import isValidEmail from "@/utils/isValidEmail";
import { Customer } from "@/models/schemas/Customer";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }
  
  try {
    const {
      name,
      lastname,
      idDocument,
      gender,
      email,
      phone,
      password,
      confirmPassword,
      dateOfBirth,
    } = req.body;
  
    if (
      !name ||
      !lastname ||
      !idDocument ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res
        .status(400)
        .json({ message: "Hay campos obligatorios sin llenar" });
    }
  
    if (!password && !confirmPassword) {
      return res
        .status(400)
        .json({ message: "Las contraseñas son obligatorias" });
    }
  
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "La contraseñas debe tener al menos 6 caracteres" });
    }
  
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Las contraseñas no coinciden" });
    }
  
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Correo electrónico inválido" });
    }
  await mongooseConnect();

    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res
        .status(400)
        .json({ message: "Ya existe una cuenta con este correo!" });
    }

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newCustomer = await Customer.create({
      name,
      lastname,
      idDocument,
      gender,
      email,
      phone,
      password: hashedPassword,
      dateOfBirth,
    });

    // Responder con éxito

    const customer = {
      _id: newCustomer._id,
      name: newCustomer.name,
      email: newCustomer.email,
    };

    console.log("Registro exitoso", customer);

    return res.status(201).json({
      message: "Registro exitoso",
      customer,
    });
  } catch (error) {
    console.error("Error al registrar:", error);
    return res.status(500).json({ message: "Error interno del servidor", });
  }
}
