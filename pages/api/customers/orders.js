import { getServerSession } from 'next-auth';
import { Customer } from '@/models/schemas/Customer';
import { mongooseConnect } from '@/lib/mongoose';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  await mongooseConnect();

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "No autorizado." });
  }

  const customerId = session.user._id;

  try {
    // Poblado completo de las órdenes
    const customer = await Customer.findById(customerId).populate({
      path: "orders", // Poblado del campo orders
      populate: {
        path: "line_items.info_order.product_data", // Poblado adicional si es necesario
      },
    });

    if (!customer) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Si el cliente no tiene órdenes, devuelve un array vacío
    const orders = customer.orders || [];

    // Devuelve las órdenes pobladas
    return res.status(200).json({ orders });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Error al recuperar pedidos.", error: err.message });
  }
}