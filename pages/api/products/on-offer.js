import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
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
  try {
    const offerFilter = { offerPrice: { $gt: 0 } };

    const totalProducts = await Product.countDocuments(offerFilter);

    const features = new APIfeatures(
      Product.find(offerFilter).select(
        "title salePrice offerPrice brand code codeWeb codeEnterprise compatibility quantity category "
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
