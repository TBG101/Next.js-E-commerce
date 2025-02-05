import { Schema, model, models } from 'mongoose';
import mongoose from 'mongoose';

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    thumbnails: { type: [String], required: true },
    sex: { type: String, required: true },
    discount: { type: Number, required: true },
});

export default models.Product || model('Product', productSchema);