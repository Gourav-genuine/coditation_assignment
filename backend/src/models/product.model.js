const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
      },
    description: {
        type: String,
        required: false
    },
})
const Product = mongoose.model('Product', productSchema);
module.exports.Product = Product;
module.exports.productSchema = productSchema;
