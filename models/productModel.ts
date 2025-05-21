import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  thumbnails: { type: [String], required: true },
  sex: { type: String, required: true },
  discount: { type: Number, required: true },
  bestSellers: { type: Boolean, required: true },
  newArrivals: { type: Boolean, required: true },
});

export default models.Product || model("Product", productSchema);
