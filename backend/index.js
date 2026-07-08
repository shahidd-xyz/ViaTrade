if(process.env.NODE_ENV != "production"){
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
const { StockModel } = require("./model/StockSchema");

const { Signup, Login, Logout } = require("./Controllers/AuthController");
const { ensureAuth } = require("./Middlewares/AuthMiddleware");
const { newOrder, getCurrPrice, deleteOrder } = require("./Controllers/Order");

const PORT = process.env.PORT || 8080;
const uri = process.env.MONGO_URL;

app.set("trust proxy", 1);

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
    origin: "https://viatrade.vercel.app",
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
  touchAfter: 24 *3600, //seconds - 24hours
});

store.on("error", ()=>{
    console.log("Error in Mongo Session Store");
});

app.use(
  session({
    store,
    secret: process.env.TOKEN_KEY,
    resave: false,
    saveUninitialized: true,
    proxy: true,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());



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

app.get("/debug-session", (req, res) => {
  console.log("Session:", req.session);
  console.log("User:", req.user);
  console.log("Authenticated:", req.isAuthenticated());

  res.json({
    session: req.session,
    user: req.user,
    authenticated: req.isAuthenticated(),
  });
});

app.get("/isUser", ensureAuth, (req,res) => {
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log("Listening on port 8080");
});
