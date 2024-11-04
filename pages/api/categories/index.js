import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const db = await mongooseConnect();
    const collection = db.collection("categories");
    const categories = await collection.find({}).sort({ _id: -1 }).toArray();
    const totalCategories = await collection.countDocuments();
    return res.json({
      result: categories.length,
      totalCategories,
      categories,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
}
