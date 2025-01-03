import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    idDocument: String,
    email: String,
    country: {
      name: String,
      isoCode: String,
    },
    province: {
      name: String,
      isoCode: String,
    },
    canton: String,
    address: String,
    phone: String,
  });
  
  const productSchema = new mongoose.Schema({
    id: String,
    name: String,
    price: Number,
    brand: String,
    code: String,
  });
  
  const lineItemSchema = new mongoose.Schema({
    quantity: Number,
    info_order: {
      currency: String,
      product_data: productSchema,
      unit_amount: Number,
    },
  });
  
  const orderSchema = new mongoose.Schema({
    id: String,
    orderNumber: String,
    name: String,
    lastname: String,
    phone: String,
    email: String,
    createdAt: { type: Date, default: Date.now },
    country: String,
    province: String,
    city: String,
    streetAddress: String,
    status: String,
    paid: Boolean,
    line_items: [lineItemSchema],
  });
  
  const customerSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      lastname: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      idDocument: { type: String, required: true, unique: true },
      phone: { type: String, required: true },
      dateOfBirth: { type: String },
      gender: { type: String },
      billingAddress: addressSchema,
      shippingAddress: addressSchema,
      orders: [orderSchema],
    },
    { timestamps: true }
  );
  
  export default mongoose.models.Customer || mongoose.model('Customer', customerSchema);