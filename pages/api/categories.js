import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  //Obtener
  if (method === "GET") {
    try {
      const categories = await Category.find({}, null, { sort: { _id: -1 } });
      return res.json(categories);
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
}
