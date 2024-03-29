import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import messages from "@/utils/messages";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  /* 
  res.setHeader("Access-Control-Allow-Origin", "http://boderoracing.com");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); */

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
  }

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const skip = (page - 1) * limit;
      const fields =
        req.query.fields ||
        `title code salePrice brand category color size images quantity description createdAt updatedAt compatibility`;

      try {
        const feature = new APIfeatures(
          Product.find().select(fields).limit(limit).skip(skip),
          req.query
        )
          .filtering()
          .sorting();

        const productsQuery = feature.query;

        const products = await productsQuery.exec();
        return res
          .status(200)
          .json({ products, message: messages.success.addedProduct });
      } catch (err) {
        return res.status(500).json({ err: err.message });
      }
    }
  }
}
