const { OrdersModel } = require("../model/OrdersModel");
const { HoldingsModel } = require("../model/HoldingsModel");
const { StockModel } = require("../model/StockSchema");

module.exports.getCurrPrice = async (req, res) => {
  try {
    const name = req.query.name;
    if (name) {
      let stock = await StockModel.findOne({ name });
      if (!stock) {
        stock = await StockModel.create({
          name,
          qty: 0,
          avg: 0,
          price: 0,
          net: "0.00%",
          day: "0.00%",
        });
      }
      return res.json(stock);
    }

    const all = await StockModel.find({});
    return res.json(all);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.newOrder = async (req, res) => {
  try {
    const { name, qty } = req.body;
    if (!name || !qty)
      return res.status(400).json({ message: "Missing name or qty" });

    // Get current price from StockModel or create a fallback entry from the request data
    let stock = await StockModel.findOne({ name });
    if (!stock) {
      stock = await StockModel.create({
        name,
        qty: 0,
        avg: Number(req.body.price || 0),
        price: Number(req.body.price || 0),
        net: "0.00%",
        day: "0.00%",
      });
    }
    const currentPrice = Number(stock.price || 0);
    const totalPrice = currentPrice * Number(qty);

    // Save order using currentPrice
    const order = new OrdersModel({
      user: req.user._id,
      name,
      qty: Number(qty),
      price: currentPrice,
      mode: req.body.mode || "BUY",
    });
    await order.save();

    // Update holdings: weighted average and latest price
    const holding = await HoldingsModel.findOne({ user: req.user._id, name });
    if (holding) {
      const oldQty = Number(holding.qty || 0);
      const oldAvg = Number(holding.avg || holding.price || 0);
      const newQty = Number(qty);
      const totalQty = oldQty + newQty;
      const newAvg =
        totalQty === 0
          ? 0
          : (oldAvg * oldQty + currentPrice * newQty) / totalQty;

      holding.qty = totalQty;
      holding.avg = newAvg;
      holding.price = currentPrice;
      await holding.save();
    } else {
      const newHolding = new HoldingsModel({
        user: req.user._id,
        name,
        qty: Number(qty),
        avg: currentPrice,
        price: currentPrice,
        net: "0.00%",
        day: "0.00%",
      });
      await newHolding.save();
    }

    return res.json({ message: "Order placed", order, totalPrice });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};


module.exports.deleteOrder = async (req, res) => {
  try {
    const name = req.body?.name || req.params?.name;
    const qty = Number(req.body?.qty ?? req.params?.qty);

    if (!name || !qty) {
      return res.status(400).json({ message: "Missing name or qty" });
    }

    const stock = await StockModel.findOne({ name });
    if (!stock) return res.status(404).json({ message: "Stock not found" });

    const currentPrice = Number(stock.price || 0);
    const totalPrice = currentPrice * qty;

    const holding = await HoldingsModel.findOne({ user: req.user._id, name });
    if (!holding) {
      return res.status(400).json({ message: "No holding found" });
    }

    const currentQty = Number(holding.qty || 0);
    if (currentQty < qty) {
      return res.status(400).json({ message: "Insufficient quantity" });
    }

    const newQty = currentQty - qty;
    if (newQty === 0) {
      await HoldingsModel.deleteOne({ _id: holding._id });
    } else {
      holding.qty = newQty;
      holding.price = currentPrice;
      await holding.save();
    }

    const order = new OrdersModel({
      user: req.user._id,
      name,
      qty: Number(qty),
      price: currentPrice,
      mode: "SELL",
    });
    await order.save();

    return res.json({ message: "Sell order placed", order, totalPrice });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
