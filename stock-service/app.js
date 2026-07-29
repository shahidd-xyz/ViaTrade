if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT || 8090;

const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/stock");


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,  
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth/upstox", authRoutes);


app.get("/", (req,res) => {
    res.send("Hello");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});