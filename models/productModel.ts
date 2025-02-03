import { Schema, model, models } from 'mongoose';
import mongoose from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

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

productSchema.plugin(AutoIncrement, {inc_field: 'id'});
export default models.Product || model('Product', productSchema);