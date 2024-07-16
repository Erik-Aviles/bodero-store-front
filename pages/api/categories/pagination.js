import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req, res) {
  await mongooseConnect();
  const { method } = req;
  const query = req.query;

  //Obtener
  if (method === "GET") {
    try {
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 20;
      const skip = (page - 1) * limit;
      const categories = await Category.find({}, null, { sort: { _id: -1 } })
        .skip(skip)
        .limit(limit);

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
