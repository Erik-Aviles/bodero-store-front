import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import messages from "@/utils/messages";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handle(req, res) {
  try {
    await mongooseConnect();

    const body = await req.body;
    const { email, password } = body;

    //validar que esten todos los campos
    if (!email || !password) {
      res.status(400).json({
        message: messages.error.needProps,
      });
    }

    const userFind = await User.findOne({ email });

    // validar si existe el email en la base de datos
    if (!userFind) {
      res.status(400).json({
        message: messages.error.userNotFound,
      });
    }

    const isCorrect = await bcrypt.compare(password, userFind.password);

    // validar que la consetraña sea la correcta
    if (!isCorrect) {
      res.status(400).json({
        message: messages.error.incorrectPassword,
      });
    }

    const { password: userPass, ...rest } = userFind._doc;

    const token = jwt.sign(
      {
        data: rest,
      },
      process.env.SECRET,
      {
        expiresIn: 86400,
      }
    );

    const response = res.status(200).json({
      userLogged: rest,
      message: messages.success.userLogged,
    });

    response.cookies.set("auth_cookie", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    });
    return response;
  } catch (error) {
    res.status(500).json({ message: messages.error.default, error });
  }
}
