import { mongooseConnect } from '@/lib/mongoose'
import { Company } from '@/models/Company'
import messages from '@/utils/messages'
// import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  await mongooseConnect()

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido' })
  }

  //Obtener la informacion de la empresa
  try {
    const data = await Company.find({})
    return res.status(200).json(data)
  } catch (error) {
    console.error('Error obteniendo los datos:', error)
    return res
      .status(500)
      .json({ message: messages.error.default, error: error.message })
  }
}
