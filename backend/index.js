if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const session = require("express-session");
const passport = require("./config/passport");
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");
const { default: MongoStore } = require("connect-mongo");
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");
const { StockModel } = require("./model/StockModel");

const { Signup, Login, Logout } = require("./Controllers/AuthController");
const { ensureAuth } = require("./Middlewares/AuthMiddleware");
const { newOrder, deleteOrder } = require("./Controllers/Order");
const { addToWatchlist, getWatchlist } = require("./Controllers/Watchlist");

const PORT = process.env.PORT || 8080;
const uri = process.env.MONGO_URL;

app.set("trust proxy", true);

mongoose
  .connect(uri)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  cors({
    origin: ["https://viatrade-dashboard.vercel.app", "http://localhost:3000"],
    credentials: true,
  }),
);

app.use(bodyParser.json());
app.use(cookieParser());

const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URL,
  crypto: {
    secret: process.env.TOKEN_KEY,
  },
  touchAfter: 24 * 3600, //seconds - 24hours
});

store.on("error", () => {
  console.log("Error in Mongo Session Store");
});

const isProduction = process.env.NODE_ENV === "production";

app.use(
  session({
    store,
    secret: process.env.TOKEN_KEY || "MySecretKey",
    resave: false,
    saveUninitialized: false,
    proxy: isProduction,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// app.get("/allHoldings", ensureAuth, async (req, res) => {
//   const allHoldings = await HoldingsModel.find({ user: req.user._id });
//   res.json(allHoldings);
// });

app.get("/allHoldings", ensureAuth, async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({
      user: req.user._id,
    });

    const result = await Promise.all(
      holdings.map(async (holding) => {
        try {
          const { data } = await axios.get(
            "http://localhost:8090/auth/upstox/quote",
            {
              params: {
                instrument_key: holding.instrumentKey,
              },
            },
          );

          const quote = data;

          const price = Number(quote.lastPrice);

          const currentValue = price * holding.qty;
          const investment = holding.avg * holding.qty;

          const pnl = currentValue - investment;

          const pnlPercent = investment === 0 ? 0 : (pnl / investment) * 100;

          return {
            instrumentKey: holding.instrumentKey,
            name: holding.name,
            qty: holding.qty,
            avg: holding.avg,

            price,

            net: `${pnlPercent.toFixed(2)}%`,

            day: `${Number(quote.change).toFixed(2)}%`,

            isLoss: pnl < 0,
          };
        } catch (err) {
          console.log(
            `Quote Error (${holding.name})`,
            err.response?.data || err.message,
          );

          return {
            instrumentKey: holding.instrumentKey,
            name: holding.name,
            qty: holding.qty,
            avg: holding.avg,

            price: 0,
            net: "0.00%",
            day: "0.00%",
            isLoss: false,
          };
        }
      }),
    );

    res.json(result);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Unable to fetch holdings",
    });
  }
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});

  res.json(allPositions);
});

app.get("/allOrders", ensureAuth, async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({ user: req.user._id });
    res.json(allOrders);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
});

app.post("/newOrder", ensureAuth, newOrder);
app.post("/deleteOrder", ensureAuth, deleteOrder);
app.delete("/deleteOrder", ensureAuth, deleteOrder);

//Watchlist Routes
app.post("/watchlist", ensureAuth, addToWatchlist);

app.get("/watchlist", ensureAuth, getWatchlist);

//Authentication & Authorization

app.post("/signup", Signup);
app.post("/register", Signup);

app.post("/login", passport.authenticate("local"), Login);

app.post("/logout", Logout);

app.get("/isUser", ensureAuth, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

app.listen(PORT, () => {
  console.log("Listening on port 8080");
});
