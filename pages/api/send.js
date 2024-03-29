import { EmailTemplate } from "@/components/EmailTemplate";
import isValidEmail from "@/utils/isValidEmail";
import messages from "@/utils/messages";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handle(req, res) {
  /*   res.setHeader("Access-Control-Allow-Origin", "http://boderoracing.com");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); */
  try {
    const body = await req.body;
    const { name, email, phone, city, country, message } = body;

    //validar que esten todos los campos
    if (!name || !email || !phone || !city || !country || !message) {
      res.status(400).json({
        message: messages.error.needProps,
      });
      return;
    }

    //validar si el email es un email
    if (!isValidEmail(email)) {
      res.status(400).json({
        message: messages.error.emailNotValid,
      });
      return;
    }

    const data = await resend.emails.send({
      from: process.env.SECRET_EMAIL,
      to: "boderoracing2016@gmail.com",
      subject: "Usuarios B.R.D ",
      react: EmailTemplate({ name, email, phone, city, country, message }),
    });

    res.status(200).json({
      message: messages.success.msgSend,
    });

    data;
  } catch (error) {
    res.status(500).json({ message: messages.error.default, error });
  }
}
