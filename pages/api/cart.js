import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "POST") {
    try {
      const ids = req.body.ids;

      const products = await Product.find({ _id: ids });

      return res.status(200).json(products);
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
}
