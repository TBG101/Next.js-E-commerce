import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  thumbnails: { type: [String], required: true },
  sex: { type: String, required: true },
  discount: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  sizes: { type: [String], required: true },
  bestSellers: { type: Boolean, required: true },
  newArrivals: { type: Boolean, required: true },
}, {
  timestamps: true
});

export default models.Product || model("Product", productSchema);
