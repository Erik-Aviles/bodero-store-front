import { Schema, model, models } from "mongoose";
import addressSchema from "./addressSchema";
import orderSchema from "./orderSchema";

const customerSchema = new Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    idDocument: { type: String, required: true, unique: true },
    gender: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true, select: false },
    dateOfBirth: { type: Date },
    billingAddress: addressSchema,
    shippingAddress: addressSchema,
    orders: [orderSchema],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true, versionKey: false }
);

export const Customer = models?.Customer || model("Customer", customerSchema);
