import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import messages from "@/utils/messages";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

export default async function handle(req, res) {
  try {
    await mongooseConnect();

    const body = await req.body;
    const { email, password } = body;

    //validar que esten todos los campos
    if (!email || !password) {
      res.json(
        {
          message: messages.error.needProps,
        },
        { status: 400 }
      );
    }

    const userFind = await User.findOne({ email });

    // validar si existe el email en la base de datos
    if (!userFind) {
      res.json(
        {
          message: messages.error.userNotFound,
        },
        { status: 400 }
      );
    }

    const isCorrect = await bcrypt.compare(password, userFind.password);

    // validar que la contraña sea la correcta
    if (!isCorrect) {
      res.json(
        {
          message: messages.error.incorrectPassword,
        },
        { status: 400 }
      );
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

    const response = res.json(
      {
        userLogged: rest,
        message: messages.success.userLogged,
      },
      { status: 200 }
    );

    response.cookies.set("auth_cookie", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    });

    response;
  } catch (error) {
    res.json({ message: messages.error.default, error }, { status: 500 });
  }
}
