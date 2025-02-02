import { Schema, model, models } from 'mongoose';

const productSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    thumbnails: { type: [String], required: true },
    sex: { type: String, required: true },
    discount: { type: Number, required: true },
});

export default models.Product || model('Product', productSchema);