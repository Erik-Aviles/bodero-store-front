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
      res.status(400).json({
        message: messages.error.notAuthorized,
      });
    }

    try {
      const isTokenValid = jwt.verify(token, process.env.SECRET);

      const { data } = isTokenValid;

      await mongooseConnect();
      const userFind = await User.findById(data._id);

      // validar si existe el usuario en la base de datos
      if (!userFind) {
        res.status(400).json({
          message: messages.error.userNotFound,
        });
      }

      const response = res.status(200).json({
        isAuthorized: true,
        message: messages.success.authorized,
      });

      response;
    } catch (error) {
      res.status(400).json({ message: messages.error.tokenNotValid, error });
    }
    console.log(headerList);
  } catch (error) {
    res.status(400).json({ message: messages.error.default, error });
  }
}
