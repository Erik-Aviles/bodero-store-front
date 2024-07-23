import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { stopwords } from "@/resource/stopwordsData";
import { removeAccents, removePluralEnding } from "@/utils/normalize";

export default async function handle(req, res) {
  const { category, q, page = 1, pageSize = 10 } = req.query;
  await mongooseConnect();

  class APIfeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }

    sorting() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(",").join(" ");
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort("-createdAt");
      }
      return this;
    }

    paginating() {
      const page = parseInt(this.queryString.page, 10) || 1;
      const limit = parseInt(this.queryString.pageSize, 10) || 10;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
  }

  if (category) {
    try {
      const totalProducts = await Product.countDocuments({
        category: category,
      });

      const features = new APIfeatures(
        Product.find({ category: category }).select(
          "title salePrice brand code codeWeb codeEnterprise images compatibility quantity category"
        ),
        req.query
      )
        .sorting()
        .paginating();

      const products = await features.query;

      return res.status(200).json({ products, totalProducts });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (q) {
    try {
      const removeSpecialChars = (str) => str.replace(/[\/()\-+. ]/g, "");

      // Convertir el término de búsqueda a minúsculas y eliminar caracteres especiales.
      const processedSearch = removeSpecialChars(q.toLowerCase());

      // Convertir el término de búsqueda en partes, eliminando acentos y caracteres especiales.
      const searchParts = removeAccents(q.toLowerCase())
        .split(" ")
        .filter((part) => !stopwords.includes(part))
        .map((part) => removePluralEnding(part));

      // Crear la consulta de búsqueda.
      const searchQuery = {
        $or: [
          { title: q },
          { code: q },
          { codeWeb: q },
          { codeEnterprise: q },
          { brand: q },
          { "compatibility.model": q },
          { "compatibility.title": q },
          {
            $and: searchParts.map((part) => ({
              $or: [
                { title: { $regex: part, $options: "i" } },
                { code: { $regex: part, $options: "i" } },
                { codeWeb: { $regex: part, $options: "i" } },
                { codeEnterprise: { $regex: part, $options: "i" } },
                { brand: { $regex: part, $options: "i" } },
                { "compatibility.model": { $regex: part, $options: "i" } },
                { "compatibility.title": { $regex: part, $options: "i" } },
              ],
            })),
          },
        ],
      };

      const totalProducts = await Product.countDocuments(searchQuery);

      const features = new APIfeatures(
        Product.find(searchQuery).select(
          "title salePrice brand code codeWeb codeEnterprise images compatibility quantity category"
        ),
        req.query
      )
        .sorting()
        .paginating();

      const products = await features.query;

      return res.status(200).json({ products, totalProducts });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}
