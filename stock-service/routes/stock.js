const express = require("express");
const router = express.Router();

const { login, callback, searchStock, getQuote } = require("../controllers/stock");

router.get("/login", login);
router.get("/callback", callback);

router.get("/search", searchStock);
router.get("/quote", getQuote);

module.exports = router;