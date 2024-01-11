/* import mongoose, { Schema, model, models } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    parent: { type: mongoose.Types.ObjectId, ref: "Category" },
    properties: [{ type: Object }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const Category = models?.Category || model("Category", categorySchema); */
import mongoose, { Schema, model, models } from "mongoose";

const CategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    parent: { type: mongoose.Types.ObjectId, ref: "Category" },
    properties: [{ type: Object }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Category = models?.Category || model("Category", CategoriesSchema);
