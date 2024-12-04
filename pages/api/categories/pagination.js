import { mongooseConnect } from '@/lib/mongoose'

export default async function handle(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido' })
  }
  const query = req.query

  try {
    const db = await mongooseConnect()
    const collection = db?.collection('categories')
    const page = parseInt(query.page) || 1
    const limit = parseInt(query.limit) || 20
    const skip = (page - 1) * limit
    const categories = await collection
      .find({})
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    const totalCategories = await collection.countDocuments()
    return res.json({
      result: categories.length,
      totalCategories,
      categories,
    })
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}
