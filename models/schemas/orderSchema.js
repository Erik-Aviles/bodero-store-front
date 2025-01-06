import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  line_items: Array,
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  idDocument: { type: String, required: true },
  phone: { type: String, required: true },
  country: {
    name: String,
    isoCode: String,
  },
  province: {
    name: String,
    isoCode: String,
  },
  city: { type: String, required: true },
  streetAddress: String,
  paid: Boolean,
  paymentMethod: Object,

  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default orderSchema;
