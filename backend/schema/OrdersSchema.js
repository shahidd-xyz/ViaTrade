const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: String,
  qty: Number,
  price: Number,
  mode: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = { OrdersSchema };
