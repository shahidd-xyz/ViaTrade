const mongoose = require("mongoose");
const { Schema } = mongoose;

const HoldingsSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  instrumentKey: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  qty: {
    type: Number,
    default: 0,
  },

  avg: {
    type: Number,
    default: 0,
  },
});

module.exports = { HoldingsSchema };
