import crypto from "crypto";
import isValidEmail from "@/utils/formats/isValidEmail";
import { Customer } from "@/models/schemas/Customer";
import { mongooseConnect } from "@/lib/mongoose";
import { Resend } from "resend";
import { ResetPasswordEmailTemplate } from "@/components/ResetPasswordEmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "El correo es obligatorio!" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Correo electrónico inválido!" });
    }
    await mongooseConnect();

    const existingCustomer = await Customer.findOne({ email });

    if (!existingCustomer) {
      return res
        .status(400)
        .json({ message: "Correo no existe en el registro!" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const passwordResetExpires = Date.now() + 3600000;

    existingCustomer.resetToken = passwordResetToken;
    existingCustomer.resetTokenExpiry = passwordResetExpires;
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password/${resetToken}`;



    console.log("La url:", resetUrl);
  } catch (error) {
    console.error("Error al registrar:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
