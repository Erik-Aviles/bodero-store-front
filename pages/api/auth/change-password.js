import { mongooseConnect } from "@/lib/mongoose";
import messages from "@/utils/messages";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handle(req, res) {
  try {
    await mongooseConnect();
    const body = await req.body;
    const { newPassword, confirmPassword } = body;

    //validar que esten todos los campos
    if (!newPassword || !confirmPassword) {
      res.status(400).json({
        message: messages.error.needProps,
      });
    }

    const headersList = await req.headers;
    const token = headersList["token"];

    //validar que haya token
    if (!token) {
      res.status(400).json({
        message: messages.error.notAuthorized,
      });
    }

    try {
      const isTokenValid = jwt.verify(token, process.env.SECRET);

      const { data } = isTokenValid;

      const userFind = await User.findById(data.userId);

      // validar si existe el usuario en la base de datos
      if (!userFind) {
        res.status(400).json({
          message: messages.error.userNotFound,
        });
      }

      //validar que las contraseñas sean iguales
      if (newPassword !== confirmPassword) {
        res.status(400).json({
          message: messages.error.passwordNotMatch,
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      userFind.password = hashedPassword;

      await userFind.save();

      const response = res.status(200).json({
        message: messages.success.passwordChanged,
      });

      response;
    } catch (error) {
      res.status(400).json({ message: messages.error.tokenNotValid, error });
    }
  } catch (error) {
    res.status(500).json({ message: messages.error.default, error });
  }
}
