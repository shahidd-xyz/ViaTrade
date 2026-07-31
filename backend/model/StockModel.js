const { model } = require("mongoose");
const { StockSchema } = require("../schema/StockSchema");

const StockModel = new model("stock", StockSchema);

module.exports = { StockModel };