import React, { useContext } from "react";
import axios from "axios";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import GeneralContext from "./GeneralContext";
import StockChart from "./StockCharts";

import API_URL from "../config/api";

const StockDetails = ({ stock }) => {
  const generalContext = useContext(GeneralContext);

  if (!stock) return null;

  const addToWatchlist = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/watchlist`,
        {
          instrumentKey: stock.instrumentKey,
          symbol: stock.symbol,
          companyName: stock.companyName,
        },
        {
          withCredentials: true,
        },
      );
      await generalContext.fetchWatchlist();

      alert(res.data.message);
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Unable to add stock to watchlist.");
    }
  };

  const percentChange = ((stock.change / stock.close) * 100).toFixed(2);

  return (
    <div className="card shadow mt-4 stock-details-card">
      <div className="card-header">
        <h4>{stock.symbol}</h4>
      </div>

      <div className="card-body">
        <h2>₹ {stock.lastPrice}</h2>

        <p>
          Change :
          <div className="ms-2">
            {" "}
            <span>{stock.change}</span>{" "}
            {stock.change < 0 ? (
              <KeyboardArrowDown className="down" />
            ) : (
              <KeyboardArrowUp className="up" />
            )}{" "}
            <span className={percentChange <= 0 ? "down" : "up"}>
              {percentChange}%
            </span>
          </div>
        </p>

        <div className="row">
          <div className="col-md-6 mb-3">
            <strong>Open</strong>
            <div>{stock.open}</div>
          </div>

          <div className="col-md-6 mb-3">
            <strong>High</strong>
            <div>{stock.high}</div>
          </div>

          <div className="col-md-6 mb-3">
            <strong>Low</strong>
            <div>{stock.low}</div>
          </div>

          <div className="col-md-6 mb-3">
            <strong>Close</strong>
            <div>{stock.close}</div>
          </div>

          <div className="col-md-6 mb-3">
            <strong>Volume</strong>
            <div>{stock.volume}</div>
          </div>

          <div className="col-md-6 mb-3">
            <strong>Average Price</strong>
            <div>{stock.averagePrice}</div>
          </div>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <button
            className="btn rounded-2"
            style={{ backgroundColor: "#2563eb", color: "#fff" }}
            onClick={() => generalContext.openBuyWindow(stock)}
          >
            Buy
          </button>

          <button
            className="btn rounded-2"
            style={{ backgroundColor: "#2563eb", color: "#fff" }}
            onClick={addToWatchlist}
          >
            <span className="fw-semibold">+</span> Add to Watchlist
          </button>
        </div>

        <hr className="my-4" />

        <StockChart instrumentKey={stock.instrumentKey} />
      </div>
    </div>
  );
};

export default StockDetails;
