import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
    codeEnterprise: {
      type: String,
      trim: true,
    },
    codeWeb: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    tax: { type: Object },
    profitability: {
      type: Number,
      trim: true,
    },
    netPrice: {
      type: Number,
      trim: true,
    },
    salePrice: {
      type: Number,
      trim: true,
    },
    profit: {
      type: Number,
      trim: true,
    },
    offerPrice: {
      type: Number,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    category: { type: String, ref: "Category" },
    color: [{ type: Object }],
    size: [{ type: Object }],
    quantity: { type: Number },
    location: { type: String, trim: true },
    description: { type: String, required: true },
    descriptionAdditional: { type: String },
    images: [{ type: String }],
    stock: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const Product = models?.Product || model("Product", productSchema);

// {
//   title: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   code: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//     trim: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   category: { type: String, required: true },
//   properties: { type: Object },
//   images: {
//     type: Array,
//     required: true,
//   },
//   checked: {
//     type: Boolean,
//     default: false,
//   },
//   quantity: {
//     type: Number,
//     default: 0,
//   },
//   sold: {
//     type: Number,
//     default: 0,
//   },
// },
// {
//   timestamps: true,
//   versionKey: false,
// }
