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
      if (queryObj.title !== "all" && typeof queryObj.title === "string") {
        this.query.find({
          title: { $regex: queryObj.title },
        });
      }
      if (queryObj.brand !== "all" && typeof queryObj.brand === "string") {
        this.query.find({
          brand: { $regex: queryObj.brand },
        });
      }
      if (queryObj.code !== "all" && typeof queryObj.code === "string") {
        this.query.find({
          code: { $regex: queryObj.code },
        });
      }
      if (
        queryObj.codeEnterprise !== "all" &&
        typeof queryObj.codeEnterprise === "string"
      ) {
        this.query.find({
          codeEnterprise: { $regex: queryObj.codeEnterprise },
        });
      }
      if (queryObj.codeWeb !== "all" && typeof queryObj.codeWeb === "string") {
        this.query.find({
          codeWeb: { $regex: queryObj.codeWeb },
        });
      }
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

  if (method === "GET") {
    try {
      const features = new APIfeatures(Product.find(), req.query)
        .filtering()
        .sorting()
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
