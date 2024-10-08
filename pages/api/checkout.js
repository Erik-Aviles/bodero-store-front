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
    const { name, email, phone, city, streetAddress, country, cartProducts } =
      req.body;

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
          info_order: {
            id: productInfo._id,
            name: productInfo.title,
            price: productInfo.salePrice,
            brand: productInfo.brand,
            code: productInfo.code,
          },
        });
      }
    }

    if (!name && !email && !phone && !city && !streetAddress && !country)
      return res.status(400).json({ message: messages.error.addInformation });

    if (!name || !email || !phone || !city || !streetAddress || !country)
      return res
        .status(400)
        .json({ message: messages.error.allFieldsAreRequired });

    const orderData = {
      line_items,
      name,
      email,
      phone,
      city,
      streetAddress,
      country,
    };

    return res
      .status(200)
      .json({ orderData, message: messages.success.orderSuccess });
  } catch (err) {
    return res
      .status(500)
      .json({ message: messages.error.default, err: err.message });
  }
}
