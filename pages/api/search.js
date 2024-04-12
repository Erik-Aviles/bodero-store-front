import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  const { category, q } = req.query;
  await mongooseConnect();

  class APIfeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
    filtering() {
      const queryObj = { ...this.queryString };

      const excludeFields = ["page", "sort", "limit"];
      excludeFields.forEach((el) => delete queryObj[el]);

      if (queryObj.category !== "all")
        this.query.find({ category: queryObj.category });
      this.query.find();
      return this;
    }

    sorting() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(",").join("");
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort("-createdAt");
      }

      return this;
    }

    paginating() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 20;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
  }

  try {
    if (q !== "all") {
      const features = new APIfeatures(
        Product.find({
          $or: [
            { title: { $regex: new RegExp(q, "iu") } },
            { brand: { $regex: new RegExp(q, "iu") } },
            { code: { $regex: new RegExp(q, "iu") } },
            { codeWeb: { $regex: new RegExp(q, "iu") } },
            { codeEnterprise: { $regex: new RegExp(q, "iu") } },
          ],
        })
          .collation({ locale: "es", strength: 3 })
          .select(
            "title salePrice brand code codeWeb codeEnterprise images compatibility quantity category"
          ),
        req.query
      )
        .sorting()
        .paginating();
      const products = await features.query;
      return res.status(200).json(products);
    }

    if (category) {
      const features = new APIfeatures(
        Product.find().select(
          "title salePrice brand code codeWeb codeEnterprise images compatibility quantity category"
        ),
        req.query
      )
        .filtering()
        .sorting()
        .paginating();

      const products = await features.query;
      return res.status(200).json(products);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
