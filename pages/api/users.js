import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";

export default async function handle(req, res) {
  try {
    await mongooseConnect();
    const users = await User.find();

    res.json({ users }, { status: 200 });
  } catch (error) {
    res.json({ message: messages.error.default, error }, { status: 500 });
  }
}
