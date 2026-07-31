const mongoose = require("mongoose");

const WatchlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    instrumentKey: {
        type: String,
        required: true,
    },

    symbol: String,

    companyName: String,

    addedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = { WatchlistSchema };