import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import messages from "@/utils/messages";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    const fields =
      req.query.fields ||
      `title salePrice brand images quantity description createdAt updatedAt`;
    try {
      let newProductsQuery = Product.find({}, null, {
        sort: { _id: -1 },
        limit: 10,
      }).select(fields);

      const newProducts = await newProductsQuery.exec();
      return res.status(200).json({
        newProducts,
        message: messages.success.successfullyObtainedData,
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
}
