const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId;
const {productSchema} = require('./product.model');



const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    products: [{
        product: productSchema
    }],
    parent_categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    child_categories: [{
        required: false,
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: []
    }],

});

const Category = mongoose.model('Category', categorySchema);
module.exports.Category = Category;
