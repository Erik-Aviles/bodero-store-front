import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import messages from "@/utils/messages";
import jwt from "jsonwebtoken";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handle(req, res) {
  try {
    await mongooseConnect();

    const body = await req.body;
    const { email } = body;

    const userFind = await User.findOne({ email });

    // validar si existe el email en la base de datos
    if (!userFind) {
      res.status(400).json({
        message: messages.error.userNotFound,
      });
    }

    const tokenData = { email: userFind.email, userId: userFind._id };

    const token = jwt.sign(
      {
        data: tokenData,
      },
      process.env.SECRET,
      {
        expiresIn: 86400,
      }
    );

    const forgetUrl = `${process.env.PUBLIC_URL}/change-password?token=${token}`;

    await resend.emails.send({
      from: process.env.SECRET_EMAIL,
      to: email,
      subject: "Cambio de contraseña",
      html: `<a href=${forgetUrl}> Cambiar contraseña </a>`,
    });

    const response = res.status(200).json({
      message: messages.success.emailSend,
    });

    response;
  } catch (error) {
    res.status(500).json({ message: messages.error.default, error });
  }
}
