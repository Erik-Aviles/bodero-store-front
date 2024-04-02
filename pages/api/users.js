import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import messages from "@/utils/messages";

export default async function handle(req, res) {
  try {
    await mongooseConnect();
    const users = await User.find().select("-password");

    res.status(200).json({ users, message: messages.success.allUsers });
  } catch (error) {
    res.status(500).json({ message: messages.error.default, error });
  }
}
