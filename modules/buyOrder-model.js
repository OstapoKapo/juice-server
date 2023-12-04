const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const buyOrderSchema = new Schema({
    amount: Number,
    price: Number,
    name: String,
    deliveryPrice: Number,
    deliveryType: String,
})

const BuyOrder = mongoose.model('BuyOrder', buyOrderSchema);

module.exports = BuyOrder;