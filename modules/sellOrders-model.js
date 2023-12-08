const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sellOrderSchema = new Schema({
    amount: Number,
    price: Number,
    name: String,
    buyer: String,
})

const SellOrder = mongoose.model('SellOrder', sellOrderSchema);

module.exports = SellOrder;