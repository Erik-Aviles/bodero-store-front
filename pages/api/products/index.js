import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'

export default async function handle(req, res) {
  await mongooseConnect()
  const { method } = req
  const query = req.query

  if (method === 'GET') {
    try {
      const page = parseInt(query.page) || 1
      const limit = parseInt(query.limit) || 20
      const skip = (page - 1) * limit
      const products = await Product.find({}, null, {
        sort: { _id: -1 },
      })
        .skip(skip)
        .limit(limit)
        .select(
          'title salePrice offerPrice brand code codeWeb codeEnterprise compatibility quantity'
        )
      const totalProducts = await Product.countDocuments()

      return res.status(200).json({
        result: products.length,
        totalProducts,
        products,
      })
    } catch (err) {
      return res.status(500).json({ err: err.message })
    }
  } else {
    res.status(405).json({ message: 'Metodo no  permitido' })
  }
}
