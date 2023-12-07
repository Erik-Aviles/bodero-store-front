import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";

export default async function handle(req, res) {
  try {
    await mongooseConnect();
    const users = await User.find();

    res.status(200).json({ users });
  } catch (error) {
    res.status(200).json({ message: messages.error.default, error });
  }
}
