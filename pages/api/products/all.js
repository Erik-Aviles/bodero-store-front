import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  await mongooseConnect();

  try {
    const products = await Product.find({}, null, {
      sort: { _id: -1 },
    }).select(
      "title salePrice offerPrice brand code codeWeb codeEnterprise images compatibility quantity category"
    );
    return res.status(200).json({ success: true, products });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/* function parseSort(sort) {
  const [field, direction] = sort.split(":");
  return { [field]: direction === "desc" ? -1 : 1 };
} */

/* 
if (q) {
  try {
    const query = q.trim();
    console.log(query);

    // Crear el filtro de búsqueda de texto
    const searchQuery = { $text: { $search: query } };

    // Busca los documentos y clasifícalos por relevancia de texto y coincidencia exacta
    const products = await Product.find(searchQuery)
      .sort()
      .select(
        "title salePrice offerPrice brand code codeWeb codeEnterprise images compatibility quantity category"
      );

    const total = await Product.countDocuments(searchQuery);

    return res.status(200).json({ success: true, products, total });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
} */
