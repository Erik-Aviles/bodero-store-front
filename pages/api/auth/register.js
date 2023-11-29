import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import isValidEmail from "@/utils/isValidEmail";
import messages from "@/utils/messages";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handle(req, res) {
  try {
    await mongooseConnect();

    const body = await req.body;
    const { email, password, confirmPassword } = body;

    //validar que esten todos los campos
    if (!email || !password || !confirmPassword) {
      res.json(
        {
          message: messages.error.needProps,
        },
        { status: 400 }
      );
    }

    //validar si el email es un email
    if (!isValidEmail(email)) {
      res.json(
        {
          message: messages.error.emailNotValid,
        },
        { status: 400 }
      );
    }

    //validar que las contraseñas sean iguales
    if (password !== confirmPassword) {
      res.json(
        {
          message: messages.error.passwordNotMatch,
        },
        { status: 400 }
      );
    }

    const userFind = await User.findOne({ email });

    // validar si ya existe el email en la base de datos
    if (userFind) {
      res.json(
        {
          message: messages.error.emailExist,
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    const { password: userPass, ...rest } = newUser._doc;

    await newUser.save();

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
        newUser: rest,
        message: messages.success.userCreated,
      },
      {
        status: 200,
      }
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
