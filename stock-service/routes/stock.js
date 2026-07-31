const express = require("express");
const router = express.Router();

const { login, callback, searchStock, getQuote, getIndices, getHistoricalData } = require("../controllers/stock");

router.get("/login", login);
router.get("/callback", callback);

router.get("/search", searchStock);
router.get("/quote", getQuote);

router.get("/indices", getIndices);

router.get("/history", getHistoricalData);

module.exports = router;