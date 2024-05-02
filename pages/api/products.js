import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  await mongooseConnect();
  const { method } = req;
  const query = req.query;

  if (method === "GET") {
    try {
      const page = query.page * 1 || 1;
      const limit = query.limit * 1 || 20;
      const skip = (page - 1) * limit;
      const products = await Product.find({}, null, {
        sort: { _id: -1 },
      })
        .skip(skip)
        .limit(limit)
        .select(
          "title salePrice brand code codeWeb codeEnterprise images compatibility quantity"
        );

      return res
        .status(200)
        .json({ status: "success", result: products.length, products });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
}
