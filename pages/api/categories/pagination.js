import { mongooseConnect } from '@/lib/mongoose'
import { Category } from '@/models/Category'

export default async function handle(req, res) {
  await mongooseConnect()

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido' })
  }
  const { page = 1, limit = 20 } = req.query

  try {
    const pageNumber = parseInt(page, 10)
    const limitNumber = parseInt(limit, 10)
    const skip = (pageNumber - 1) * limitNumber

    const categories = await Category.find({})
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limitNumber)

    const totalCategories = await Category.countDocuments()

    return res.json({
      result: categories.length,
      totalCategories,
      categories,
    })
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}
