/* import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true },
    price: { type: Number, required: true, trim: true },
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    quantity: { type: Number, required: true },
    images: [{ type: String }],
    properties: { type: Object },
    description: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Product = models?.Product || model("Product", ProductSchema); */

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
    priceVen: {
      type: Number,
      required: true,
      trim: true,
    },
    priceDis: {
      type: Number,
      required: true,
      trim: true,
    },
    priceOff: {
      type: Number,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    category: { type: String, required: true, ref: "Category" },
    properties: { type: Object },
    quantity: { type: Number, required: true },
    location: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    checked: {
      type: Boolean,
      default: false,
    },
    sold: {
      type: Number,
      default: 0,
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
