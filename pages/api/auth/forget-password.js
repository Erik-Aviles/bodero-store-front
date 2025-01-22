import crypto from "crypto";
import isValidEmail from "@/utils/formats/isValidEmail";
import { mongooseConnect } from "@/lib/mongoose";
import sgMail from "@sendgrid/mail";
import { Customer } from "@/models/schemas/Customer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "El correo es obligatorio!" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Correo electrónico inválido!" });
  }

  try {
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
    await existingCustomer.save();

    // Generar la URL de reseteo
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/restablecer-contrasena/${resetToken}`;

    // Verificar que la API Key de SendGrid esté configurada
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error("Falta la clave API de SendGrid.");
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

    const inbody = `Hola, ${existingCustomer.name.toUpperCase()}. \n\nPara restablecer tu contraseña debes dar clic en el siguiente enlace: ${resetUrl} \n\nNota: Este enlace es valido dentro de los 60 minutos.`;
    // Configurar y enviar el correo
    const msg = {
      to: email,
      from: `Bodero Racing Development <boderoracing2016@gmail.com>`,
      subject: "Reestablecer contraseña",
      text: inbody,
    };
    await sgMail.send(msg);

    return res.status(200).json({
      message:
        "Hemos enviado un enlace a tu correo registrado para restablecer la contraseña!",
    });
  } catch (error) {
    console.error("Error en el proceso:", error);

    // Revertir cambios en el cliente si algo falla
    if (error instanceof sgMail.MailServiceError && error.response) {
      await Customer.updateOne(
        { email },
        { $unset: { resetToken: "", resetTokenExpiry: "" } }
      );
    }

    return res.status(500).json({
      message: "Error interno del servidor. Intenta nuevamente más tarde.",
      error: error.message,
    });
  }
}

/*   await sgMail
    .send(msg)
    .then(() => {
      return res.status(200).json({
        message:
          "Hemos enviado un enlace a tu correo registrado para restablece la contraseña!",
      });
    })
    .catch(async (error) => {
      existingCustomer.resetToken = undefined;
      existingCustomer.resetTokenExpiry = undefined;
      await existingCustomer.save();
      return res
        .status(400)
        .json({ message: "Falló enviando al email. Intente nuevamente!" });
    });

  try {
    await existingCustomer.save();
    return res.status(200).json({
      message: "Email enviado para restablece la contraseña!",
    });
  } catch (error) {
    console.error("Error al registrar:", error);
    return res
      .status(500)
      .json({ error, message: "Error interno del servidor" });
  }
}
 */
