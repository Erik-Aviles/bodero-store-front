import { mongooseConnect } from '@/lib/mongoose'
import { Category } from '@/models/Category'

export default async function handle(req, res) {
  await mongooseConnect()

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido' })
  }

  try {
    const categories = await Category.find({}).sort({ _id: -1 })
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
