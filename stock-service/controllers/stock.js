const axios = require("axios");

const upstoxService = require("../services/upstoxService");

const login = (req, res) => {
  const authUrl =
    `https://api.upstox.com/v2/login/authorization/dialog` +
    `?response_type=code` +
    `&client_id=${process.env.UPSTOX_API_KEY}` +
    `&redirect_uri=${encodeURIComponent(process.env.UPSTOX_REDIRECT_URI)}`;

  res.redirect(authUrl);
};

const callback = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Authorization code not received",
      });
    }

    const accessToken = await upstoxService.getAccessToken(code);

    // Temporary storage (later we'll replace this)
    global.accessToken = accessToken;

    const profile = await upstoxService.getProfile(accessToken);

    res.status(200).json({
      success: true,
      message: "Authentication successful",
      profile,
    });
  } catch (err) {
    console.error(err.response?.data || err.message);

    res.status(500).json({
      success: false,
      message: "Authentication failed",
      error: err.response?.data || err.message,
    });
  }
};

const searchStock = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const stocks = await upstoxService.searchStock(q);

    res.status(200).json(stocks);
  } catch (err) {
    console.error(err.response?.data || err.message);

    res.status(500).json({
      success: false,
      message: err.response?.data || err.message,
    });
  }
};

const getQuote = async (req, res) => {
  try {
    const { instrument_key } = req.query;

    if (!instrument_key) {
      return res.status(400).json({
        success: false,
        message: "Instrument key is required",
      });
    }

    const quote = await upstoxService.getQuote(instrument_key);

    res.status(200).json(quote);
  } catch (err) {
    console.error(err.response?.data || err);

    res.status(500).json({
      success: false,
      message: err.response?.data || err.message,
    });
  }
};

const getIndices = async (req, res) => {
  try {
    const data = await upstoxService.getIndices();

    res.json({
      nifty: {
        price: data["NSE_INDEX:Nifty 50"].last_price,
        change: data["NSE_INDEX:Nifty 50"].net_change,
      },
      sensex: {
        price: data["BSE_INDEX:SENSEX"].last_price,
        change: data["BSE_INDEX:SENSEX"].net_change,
      },
    });
  } catch (err) {
    console.error(err.response?.data || err.message);

    res.status(500).json({
      success: false,
      message: err.response?.data || err.message,
    });
  }
};

const getHistoricalData = async (req, res) => {
  try {
    const { instrument_key, interval = "day", to, from } = req.query;

    if (!instrument_key) {
      return res.status(400).json({
        success: false,
        message: "Instrument key required",
      });
    }

    const data = await upstoxService.getHistoricalData(
      instrument_key,
      interval,
      to,
      from,
    );

    res.json(data);
  } catch (err) {
    console.error(err.response?.data || err.message);

    res.status(500).json({
      success: false,
      message: err.response?.data || err.message,
    });
  }
};

module.exports = {
  login,
  callback,
  searchStock,
  getQuote,
  getIndices,
  getHistoricalData,
};
