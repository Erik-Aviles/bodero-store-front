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
      res.json(
        {
          message: messages.error.needProps,
        },
        { status: 400 }
      );
    }

    const headersList = await req.headers;
    const token = headersList["token"];

    //validar que haya token
    if (!token) {
      res.json(
        {
          message: messages.error.notAuthorized,
        },
        { status: 400 }
      );
    }

    try {
      const isTokenValid = jwt.verify(token, process.env.SECRET);

      const { data } = isTokenValid;

      const userFind = await User.findById(data.userId);

      // validar si existe el usuario en la base de datos
      if (!userFind) {
        res.json(
          {
            message: messages.error.userNotFound,
          },
          { status: 400 }
        );
      }

      //validar que las contraseñas sean iguales
      if (newPassword !== confirmPassword) {
        res.json(
          {
            message: messages.error.passwordNotMatch,
          },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      userFind.password = hashedPassword;

      await userFind.save();

      const response = res.json(
        {
          message: messages.success.passwordChanged,
        },
        { status: 200 }
      );

      response;
    } catch (error) {
      res.json(
        { message: messages.error.tokenNotValid, error },
        { status: 400 }
      );
    }
  } catch (error) {
    res.json({ message: messages.error.default, error }, { status: 500 });
  }
}
