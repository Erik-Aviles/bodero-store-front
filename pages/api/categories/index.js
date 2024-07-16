import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req, res) {
  await mongooseConnect();
  const { method } = req;

  //Obtener
  if (method === "GET") {
    try {
      const categories = await Category.find({}, null, { sort: { _id: -1 } });
      const totalCategories = await Category.countDocuments();
      return res.json({
        result: categories.length,
        totalCategories,
        categories,
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
}
