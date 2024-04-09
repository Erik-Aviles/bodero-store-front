import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  try {
    await mongooseConnect();
    const { id, q } = req.query;

    if (id) {
      const item = await Product.find({}, null, { sort: { _id: -1 } });
      return res.status(200).json(item);
    }

    if (q) {
      const products = await Product.find({
        $or: [
          { title: { $regex: new RegExp(q, "i") } },
          { brand: { $regex: new RegExp(q, "i") } },
          { code: { $regex: new RegExp(q, "i") } },
          { codeWeb: { $regex: new RegExp(q, "i") } },
          { codeEnterprise: { $regex: new RegExp(q, "i") } },
        ],
      })
        .collation({ locale: "es", strength: 2 })
        .select("title brand code codeWeb codeEnterprise images compatibility");
      return res.status(200).json(products);
    }

    return res.status(400).json();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
