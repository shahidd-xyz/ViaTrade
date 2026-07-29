const axios = require("axios");

const getAccessToken = async (code) => {
    const response = await axios.post(
        "https://api.upstox.com/v2/login/authorization/token",
        new URLSearchParams({
            code,
            client_id: process.env.UPSTOX_API_KEY,
            client_secret: process.env.UPSTOX_API_SECRET,
            redirect_uri: process.env.UPSTOX_REDIRECT_URI,
            grant_type: "authorization_code",
        }),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
            },
        }
    );

    return response.data.access_token;
};

const getProfile = async (accessToken) => {
    const response = await axios.get(
        "https://api.upstox.com/v2/user/profile",
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
            },
        }
    );

    return response.data;
};


const searchStock = async (query) => {
    const response = await axios.get(
        "https://api.upstox.com/v2/instruments/search",
        {
            headers: {
                Authorization: `Bearer ${global.accessToken}`,
                Accept: "application/json",
            },
            params: {
                query,
                exchanges: "NSE,BSE",
                segments: "EQ",
                page_number: 1,
                records: 20,
            },
        }
    );

    return response.data;
};

const getQuote = async (instrumentKey) => {
    const response = await axios.get(
        "https://api.upstox.com/v2/market-quote/quotes",
        {
            headers: {
                Authorization: `Bearer ${global.accessToken}`,
                Accept: "application/json",
            },
            params: {
                instrument_key: instrumentKey,
            },
        }
    );

    const stock = Object.values(response.data.data)[0];

    return {
        symbol: stock.symbol,
        instrumentKey: stock.instrument_token,
        lastPrice: stock.last_price,
        change: stock.net_change,
        open: stock.ohlc.open,
        high: stock.ohlc.high,
        low: stock.ohlc.low,
        close: stock.ohlc.close,
        volume: stock.volume,
        averagePrice: stock.average_price,
        upperCircuit: stock.upper_circuit_limit,
        lowerCircuit: stock.lower_circuit_limit,
        totalBuyQuantity: stock.total_buy_quantity,
        totalSellQuantity: stock.total_sell_quantity,
        timestamp: stock.timestamp,
    };
};

module.exports = {
    getAccessToken,
    getProfile,
    searchStock,
    getQuote,
};