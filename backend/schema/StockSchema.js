const {Schema} = require("mongoose");


const StockSchema = new Schema({
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day: String,
});

module.exports = { StockSchema };