const axios = require("axios");
const { WatchlistModel } = require("../model/WatchlistModel");

// Add Stock to Watchlist
module.exports.addToWatchlist = async (req, res) => {
  try {
    const { instrumentKey, symbol, companyName } = req.body;

    const existing = await WatchlistModel.findOne({
      userId: req.user._id,
      instrumentKey,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Stock already exists in watchlist",
      });
    }

    const stock = await WatchlistModel.create({
      userId: req.user._id,
      instrumentKey,
      symbol,
      companyName,
    });

    res.status(201).json({
      success: true,
      message: "Stock added to watchlist",
      stock,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get User Watchlist
module.exports.getWatchlist = async (req, res) => {
  try {
    const stocks = await WatchlistModel.find({
      userId: req.user._id,
    });

    const watchlist = await Promise.all(
      stocks.map(async (stock) => {
        try {
          const { data: quote } = await axios.get(
            "http://localhost:8090/auth/upstox/quote",
            {
              params: {
                instrument_key: stock.instrumentKey,
              },
            },
          );

          return {
            instrumentKey: stock.instrumentKey,
            symbol: stock.symbol,
            companyName: stock.companyName,

            lastPrice: quote.lastPrice,
            change: quote.change,

            percent:
              quote.close && quote.close !== 0
                ? ((quote.change / quote.close) * 100).toFixed(2)
                : "0.00",

            isDown: quote.change < 0,

            open: quote.open,
            high: quote.high,
            low: quote.low,
            close: quote.close,
            volume: quote.volume,
            averagePrice: quote.averagePrice,
          };
        } catch (err) {
          console.error(
            `Quote failed for ${stock.symbol}:`,
            err.response?.data || err.message,
          );

          return {
            instrumentKey: stock.instrumentKey,
            symbol: stock.symbol,
            companyName: stock.companyName,

            lastPrice: 0,
            change: 0,
            percent: "0.00",
            isDown: false,

            open: 0,
            high: 0,
            low: 0,
            close: 0,
            volume: 0,
            averagePrice: 0,
          };
        }
      }),
    );

    res.status(200).json({
      success: true,
      stocks: watchlist,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
