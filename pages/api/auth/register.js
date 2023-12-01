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
      res.status(400).json({
        message: messages.error.needProps,
      });
    }

    //validar si el email es un email
    if (!isValidEmail(email)) {
      res.status(400).json({
        message: messages.error.emailNotValid,
      });
    }

    //validar que las contraseñas sean iguales
    if (password !== confirmPassword) {
      res.status(400).json({
        message: messages.error.passwordNotMatch,
      });
    }

    const userFind = await User.findOne({ email });

    // validar si ya existe el email en la base de datos
    if (userFind) {
      res.status(400).json({
        message: messages.error.emailExist,
      });
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

    const response = res.status(200).json({
      newUser: rest,
      message: messages.success.userCreated,
    });

    response.cookies.set("auth_cookie", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    });

    response;
  } catch (error) {
    res.status(500).json({ message: messages.error.default, error });
  }
}
