import { Schema, model, models } from "mongoose";
import { OrderSchema } from "../Order";

const customerSchema = new Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    idDocument: { type: String, required: true, unique: true },
    gender: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true, select: false },
    resetToken: { type: String, required: false },
    resetTokenExpiry: { type: Date, required: false },
    dateOfBirth: { type: Date },
    billingAddress: Object,
    shippingAddress: Object,
    orders: [OrderSchema],
    cart: Array,
    typeclient: {
      type: String,
      default: "online",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true, versionKey: false }
);

export const Customer = models?.Customer || model("Customer", customerSchema);