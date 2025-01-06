import { mongooseConnect } from '@/lib/mongoose';
import { Customer } from '@/models/schemas/Customer';

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === 'POST') {
    const { customerId, order } = req.body; // Cliente y pedido
    try {
      const customer = await Customer.findById(customerId);
      if (!customer) return res.status(404).json({ error: 'Cliente no encontrado.' });

      customer.orders.push(order); // Añadir el pedido
      await customer.save();
      res.status(201).json(customer);
    } catch (error) {
      res.status(400).json({ error: 'Error al agregar pedido.' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido.' });
  }
}
