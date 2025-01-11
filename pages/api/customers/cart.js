import { mongooseConnect } from "@/lib/mongoose";
import { authOptions } from "../auth/[...nextauth]";
import { Customer } from "@/models/schemas/Customer";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "No autorizado" });
  }

  const customerId = session.user._id;
  await mongooseConnect();

  if (req.method === "GET") {
    const customer = await Customer.findOne({ _id: customerId }).populate(
      "cart"
    );
    const cart = customer?.cart || [];

    return res.status(200).json({ cart });
  }

  if (req.method === "PUT") {
    const { cartProducts } = req.body;

    if (!cartProducts || !Array.isArray(cartProducts)) {
      return res.status(400).json({ message: "El carrito debe ser un array" });
    }

    try {
      const customer = await Customer.findOneAndUpdate(
        { _id: customerId },
        { $set: { cart: cartProducts } },
        { upsert: true, new: true }
      );
      return res.status(200).json({
        message: "Carrito actualizado",
        cart: customer.cart,
      });
    } catch (error) {
      console.error("Error al actualizar el carrito:", error);
      return res.status(500).json({
        message: "Hubo un error al actualizar el carrito",
        error: error.message,
      });
    }
  }

  if (req.method === "DELETE") {
    await Customer.updateOne({ _id: user._id }, { $unset: { cart: "" } });
    res.status(200).json({ message: "Carrito limpiado" });
  }
}
