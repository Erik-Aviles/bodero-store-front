import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  if (req.method !== "POST") {
    res.json("Debe ser una solicitud de publicación");
    return;
  }
  const {
    name,
    email,
    phone,
    city,
    postalCode,
    streetAddress,
    country,
    products,
  } = req.body;

  await mongooseConnect();

  const productIds = products.split(",");
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
          product_data: { name: productInfo.name },
          unit_amount: quantity * productInfo.price,
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
    postalCode,
    streetAddress,
    country,
    paid: false,
  });
}
