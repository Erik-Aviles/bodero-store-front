import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  await mongooseConnect();
  const { method } = req;

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
    paginating() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 20;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
  }

  if (method === "GET") {
    try {
      const features = new APIfeatures(
        Product.find().select(
          "title salePrice brand code codeWeb codeEnterprise images compatibility quantity"
        ),
        req.query
      )
        .filtering()
        .paginating();

      const products = await features.query;

      res.json({
        status: "success",
        result: products.length,
        products,
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
}
