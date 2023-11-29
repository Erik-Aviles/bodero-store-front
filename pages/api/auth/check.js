import { headers } from "next/headers";
import { mongooseConnect } from "@/lib/mongoose";
import messages from "@/utils/messages";
import { User } from "@/models/User";
import jwt from "jsonwebtoken";

export default async function handle() {
  try {
    const headerList = headers();
    const token = headerList.get("token");

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

      await mongooseConnect();
      const userFind = await User.findById(data._id);

      // validar si existe el usuario en la base de datos
      if (!userFind) {
        res.json(
          {
            message: messages.error.userNotFound,
          },
          { status: 400 }
        );
      }

      const response = res.json(
        {
          isAuthorized: true,
          message: messages.success.authorized,
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
    console.log(headerList);
  } catch (error) {
    res.json({ message: messages.error.default, error }, { status: 400 });
  }
}
