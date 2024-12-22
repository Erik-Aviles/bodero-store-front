import { Schema, model, models } from 'mongoose'

const OrderSchema = new Schema(
  {
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
    paid: Boolean,
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const Order = models?.Order || model('Order', OrderSchema)
