import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  await mongooseConnect();
  const { method } = req;
  const { id } = req.query;

  if (method === "GET") {
    try {
      const product = await Product.findById(id).select(
        "title salePrice offerPrice brand code codeWeb codeEnterprise description images compatibility quantity"
      );

      if (!product) {
        return res.status(404).json({ message: "Product0 no encontrado" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Erropr del sevidor", error });
    }
  } else {
    res.status(405).json({ message: "Metodo no  permitido" });
  }
}
