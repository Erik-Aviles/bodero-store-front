import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { Customer } from "@/models/schemas/Customer";
import messages from "@/utils/messages";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
// const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  // Verificar método
  if (method !== "POST") {
    return res
      .status(405)
      .json({ message: "Debe ser una solicitud de publicación" });
  }

  // Obtener la sesión
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "No autorizado" });
  }

  try {
    // Obtener el ID del usuario autenticado
    const customerId = session.user._id;

    // Datos recibidos desde el cliente
    const {
      name,
      lastname,
      email,
      idDocument,
      phone,
      country,
      province,
      city,
      streetAddress,
      postal,
      cartProducts,
    } = req.body;

    // Validar campos requeridos
    if (
      !name ||
      !lastname ||
      !email ||
      !idDocument ||
      !phone ||
      !country ||
      !province ||
      !city ||
      !streetAddress
    ) {
      return res
        .status(400)
        .json({ message: messages.error.allFieldsAreRequired });
    }

    // Validar productos en el carrito
    if (
      !cartProducts ||
      !Array.isArray(cartProducts) ||
      cartProducts.length === 0
    ) {
      return res.status(400).json({ message: "El carrito está vacío." });
    }

    // Buscar productos únicos
    const productIds = [...new Set(cartProducts)];
    const productsInfos = await Product.find({ _id: { $in: productIds } });

    // Construir line_items
    const line_items = productIds
      .map((productId) => {
        const productInfo = productsInfos.find(
          (p) => p._id.toString() === productId
        );
        const quantity =
          cartProducts.filter((id) => id === productId)?.length || 0;

        if (quantity > 0 && productInfo) {
          return {
            quantity,
            info_order: {
              currency: "USD",
              product_data: {
                id: productInfo._id,
                name: productInfo.title,
                price: productInfo.salePrice,
                brand: productInfo.brand,
                code: productInfo.code,
              },
              unit_amount: quantity * productInfo.salePrice,
            },
          };
        }
      })
      .filter(Boolean);

    const orderNumber = await generateOrderNumber();

    const orderDoc = await Order.create({
      orderNumber: orderNumber,
      customerId,
      line_items,
      name,
      lastname,
      email,
      idDocument,
      phone,
      country,
      province,
      city,
      streetAddress,
      postal,
      paid: false,
      status: "pending",
    });

    // Actualizar el cliente autenticado agregando el ID del pedido
    await Customer.findByIdAndUpdate(
      customerId,
      { $push: { orders: orderDoc._id } },
      { new: true }
    );

    // Respuesta exitosa
    return res
      .status(201)
      .json({ order: orderDoc, message: messages.success.orderSuccess });
  } catch (err) {
    console.error("Error al crear el pedido:", err);
    return res
      .status(500)
      .json({ message: messages.error.default, error: err.message });
  }
}

const generateOrderNumber = async () => {
  await mongooseConnect();
  const date = new Date();
  const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;

  const randomCode = Math.floor(10000 + Math.random() * 90000); // Código aleatorio de 5 dígitos
  const orderNumber = `ORD-${formattedDate}-${randomCode}`;

  // Verificar que sea único en la base de datos
  const existingOrder = await Order.findOne({ orderNumber });
  if (existingOrder) {
    return generateOrderNumber(); // Si ya existe, generar uno nuevo
  }

  return orderNumber;
};
