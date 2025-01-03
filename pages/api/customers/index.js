import { mongooseConnect } from '@/lib/mongoose';
import Customer from '@/models/Customer';

export default async function handler(req, res) {
    await mongooseConnect()// Conectar a la base de datos

  if (req.method === 'GET') {
    try {
      const customers = await Customer.find(); // Obtener todos los clientes
      res.status(200).json(customers);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener clientes.' });
    }
  }

  if (req.method === 'POST') {
    try {
      const customer = new Customer(req.body);
      const savedCustomer = await customer.save(); // Guardar nuevo cliente
      res.status(201).json(savedCustomer);
    } catch (error) {
      res.status(400).json({ error: 'Error al crear cliente.' });
    }
  }

  res.status(405).json({ error: 'Método no permitido.' }); // Métodos no permitidos
}
