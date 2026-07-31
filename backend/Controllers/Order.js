
const { OrdersModel } = require("../model/OrdersModel");
const { HoldingsModel } = require("../model/HoldingsModel");

// ==========================
// BUY ORDER
// ==========================
module.exports.newOrder = async (req, res) => {
  try {
    const { instrumentKey, name, qty, price, mode = "BUY" } = req.body;

    if (!instrumentKey || !name || !qty || !price) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const quantity = Number(qty);
    const executionPrice = Number(price);

    if (quantity <= 0 || executionPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity or price",
      });
    }

    // Save Order
    const order = await OrdersModel.create({
      user: req.user._id,
      instrumentKey,
      name,
      qty: quantity,
      price: executionPrice,
      mode,
    });

    // Find Existing Holding
    let holding = await HoldingsModel.findOne({
      user: req.user._id,
      instrumentKey,
    });

    if (!holding) {
      await HoldingsModel.create({
        user: req.user._id,
        instrumentKey,
        name,
        qty: quantity,
        avg: executionPrice,
      });
    } else {
      const totalQty = holding.qty + quantity;

      holding.avg =
        (holding.avg * holding.qty + executionPrice * quantity) / totalQty;

      holding.qty = totalQty;

      await holding.save();
    }

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================
// SELL ORDER
// ==========================
module.exports.deleteOrder = async (req, res) => {
  try {
    const { instrumentKey, name, qty, price } = req.body;

    if (!instrumentKey || !name || !qty || !price) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const quantity = Number(qty);
    const executionPrice = Number(price);

    const holding = await HoldingsModel.findOne({
      user: req.user._id,
      instrumentKey,
    });

    if (!holding) {
      return res.status(404).json({
        success: false,
        message: "Holding not found",
      });
    }

    if (holding.qty < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient quantity",
      });
    }

    holding.qty -= quantity;

    if (holding.qty === 0) {
      await HoldingsModel.deleteOne({
        _id: holding._id,
      });
    } else {
      await holding.save();
    }

    const order = await OrdersModel.create({
      user: req.user._id,
      instrumentKey,
      name,
      qty: quantity,
      price: executionPrice,
      mode: "SELL",
    });

    return res.status(200).json({
      success: true,
      message: "Sell order placed successfully",
      order,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
