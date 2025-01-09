import { Schema, model, models } from "mongoose";

export const OrderSchema = new Schema(
  {
    orderNumber: { type: String, unique: true },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    line_items: Object,
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    idDocument: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    province: { type: String, required: true },
    city: { type: String, required: true },
    streetAddress: String,
    postal: { type: String },
    paid: { type: Boolean, default: false },
    status: { type: String, default: "pending" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Order = models?.Order || model("Order", OrderSchema);
