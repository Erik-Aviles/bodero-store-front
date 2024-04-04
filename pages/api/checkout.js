import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import messages from "@/utils/messages";
// const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method !== "POST") {
    res.json("Debe ser una solicitud de publicación");
    return;
  }

  try {
    const {
      name,
      email,
      phone,
      city,
      streetAddress,
      country,
      products,
      cartProducts,
    } = req.body;

    const productIds = cartProducts;
    const uniqueIds = [...new Set(productIds)];
    const productsInfos = await Product.find({ _id: uniqueIds });

    let line_items = [];
    for (const productId of uniqueIds) {
      const productInfo = productsInfos.find(
        (p) => p._id.toString() === productId
      );
      const quantity = productIds.filter((id) => id === productId)?.length || 0;
      if (quantity > 0 && productInfo) {
        line_items.push({
          quantity,
          price_data: {
            currency: "USD",
            product_data: { name: productInfo.title },
            unit_amount: quantity * productInfo.salePrice * 100,
          },
        });
      }
    }

    const orderDoc = await Order.create({
      line_items,
      name,
      email,
      phone,
      city,
      streetAddress,
      country,
      paid: false,
    });

    return res
      .status(200)
      .json({ orderDoc, message: messages.success.orderSuccess });
  } catch (err) {
    return res
      .status(500)
      .json({ message: messages.error.default, err: err.message });
  }
}
