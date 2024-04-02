import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "POST") {
    try {
      const ids = req.body.ids;
      res.json(await Product.find({ _id: ids }));
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
}
