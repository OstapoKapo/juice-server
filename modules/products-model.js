const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    price: Number,
    img: String,
    amount: Number
})

const Products = mongoose.model('Products', productSchema);

module.exports = Products;