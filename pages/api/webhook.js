import { mongooseConnect } from "@/lib/mongoose";
const stripe = require("stripe")(process.env.STRIPE_SK);
import { buffer } from "micro";

const endpointSecret = process.env.ENDPOINT_SECRET;

export default async function handle(req, res) {
  await mongooseConnect();

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const data = event.data.object;
      console.log(data);
      break;
    default:
      console.log(`Tipo de evento no controlado ${event.type}`);
  }
}

export const config = {
  api: { bodyParser: false },
};
