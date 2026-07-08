require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const session = require("express-session");
const passport = require("./config/passport");
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");
const { StockModel } = require("./model/StockSchema");

const { Signup, Login, Logout } = require("./Controllers/AuthController");
const { isLoggedIn, ensureAuth } = require("./Middlewares/AuthMiddleware");
const { newOrder, getCurrPrice, deleteOrder } = require("./Controllers/Order");

const PORT = process.env.PORT || 8080;
const uri = process.env.MONGO_URL;

mongoose
  .connect(uri)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// const allowedCors = ["https://via-trade.vercel.app", "http://localhost:3000"];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       console.log("Incoming Origin:", origin);

//       if (!origin) {
//         return callback(null, true);
//       }

//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }

//       console.log("Blocked Origin:", origin);
//       callback(new Error("CORS blocked"));
//     },
//     credentials: true,
//   }),
// );

app.use(
  cors({
    origin: "https://viatrade.vercel.app",
    credentials: true,
  }),
);

app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.TOKEN_KEY,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      httpOnly: true,
      secure: true, // Render uses HTTPS
      sameSite: "none", // Required for different origins
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// app.get("/addStocks", (req, res) => {
//   let tempStocks = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];

//   tempStocks.forEach((item) => {
//     let newStock = new StockModel({
//         name: item.name,
//         qty: item.qty,
//         avg: item.avg,
//         price: item.price,
//         net: item.net,
//         day: item.day,
//     });

//     newStock.save();
//   });
//   res.send("Stocks Done");
// });

// app.get("/addPositions", (req, res) => {
//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   tempPositions.forEach((item) => {
//     let newPosition = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//     newPosition.save();
//   });

//   res.send("Done");
// });

app.get("/allHoldings", ensureAuth, async (req, res) => {
  const allHoldings = await HoldingsModel.find({ user: req.user._id });
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});

  res.json(allPositions);
});

app.get("/allOrders", ensureAuth, async (req, res) => {
  const allOrders = await OrdersModel.find({ user: req.user._id });
  res.json(allOrders);
});

app.get("/getCurrPrice", getCurrPrice);
app.post("/newOrder", ensureAuth, newOrder);
app.post("/deleteOrder", ensureAuth, deleteOrder);
app.delete("/deleteOrder", ensureAuth, deleteOrder);

//Authentication & Authorization

app.post("/signup", Signup);
app.post("/register", Signup);

app.post("/login", passport.authenticate("local"), Login);

app.post("/logout", Logout);

app.get("/isUser", isLoggedIn);

app.listen(PORT, () => {
  console.log("Listening on port 8080");
});
