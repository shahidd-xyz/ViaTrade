import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import API_URL from "../config/api";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";
import { toast } from "react-toastify";

const BuyActionWindow = ({ stock, mode = "BUY" }) => {
  const { closeBuyWindow } = useContext(GeneralContext);

  const isSellMode = mode === "SELL";

  const [stockQuantity, setStockQuantity] = useState(1);
  const [maxSellQty, setMaxSellQty] = useState(0);

  const stockPrice = Number(stock?.lastPrice || 0);

  const numericQuantity = Number(stockQuantity) || 0;
  const orderValue = stockPrice * numericQuantity;

  useEffect(() => {
    setStockQuantity(1);
  }, [stock, mode]);

  useEffect(() => {
    const fetchHoldings = async () => {
      if (!isSellMode) return;

      try {
        const res = await axios.get(`${API_URL}/allHoldings`, {
          withCredentials: true,
        });

        const holdings = Array.isArray(res.data) ? res.data : [];

        const holding = holdings.find(
          (item) => item.instrumentKey === stock.instrumentKey,
        );

        setMaxSellQty(Number(holding?.qty || 0));
      } catch (err) {
        console.error(err);
      }
    };

    fetchHoldings();
  }, [stock, isSellMode]);

  const handleQuantityChange = (value) => {
    if (value === "") {
      setStockQuantity("");
      return;
    }

    const parsed = Math.max(0, Number(value));
    setStockQuantity(Number.isNaN(parsed) ? "" : parsed);
  };

  const isQuantityValid =
    numericQuantity > 0 && (!isSellMode || numericQuantity <= maxSellQty);

  const quantityWarning =
    isSellMode && numericQuantity > maxSellQty
      ? `You can sell up to ${maxSellQty} unit${maxSellQty === 1 ? "" : "s"}.`
      : "";

  const handleBuyClick = async () => {
    try {
      await axios.post(
        `${API_URL}/newOrder`,
        {
          instrumentKey: stock.instrumentKey,
          name: stock.symbol,
          qty: numericQuantity,
          price: stockPrice,
          mode: "BUY",
        },
        {
          withCredentials: true,
        },
      );

      toast.success("Buy Order Confirmed!")
      closeBuyWindow();
    } catch (err) {
      console.error(err);

      toast.error(err?.response?.data?.message || "Unable to place buy order");
    }
  };

  const handleSellClick = async () => {
    try {
      await axios.post(
        `${API_URL}/deleteOrder`,
        {
          instrumentKey: stock.instrumentKey,
          name: stock.symbol,
          qty: numericQuantity,
          price: stockPrice,
          mode: "SELL",
        },
        {
          withCredentials: true,
        },
      );

      toast.success("Sell Order Confirmed!");
      closeBuyWindow();
    } catch (err) {
      console.error(err);

      toast.error(err?.response?.data?.message || "Unable to place sell order");
    }
  };

  return (
    <>
      <div className="buy-window-backdrop" onClick={closeBuyWindow} />

      <div className="container" id="buy-window">
        <div className={`header ${isSellMode ? "sell-header" : ""}`}>
          <h3>
            {isSellMode ? "Sell" : "Buy"} {stock.symbol}
          </h3>

          <p className="market-options">NSE · Market Order</p>
        </div>

        <div className="regular-order">
          <div className="inputs">
            <fieldset>
              <legend>Qty.</legend>

              <input
                type="number"
                min={1}
                max={isSellMode ? maxSellQty : undefined}
                value={stockQuantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
              />
            </fieldset>

            <p>Current Price : ₹{stockPrice.toFixed(2)}</p>

            <p>
              {isSellMode ? "Sell Value" : "Total Price"}: ₹
              {orderValue.toFixed(2)}
            </p>

            {isSellMode && <p>Max Qty Available : {maxSellQty}</p>}

            {quantityWarning && (
              <p
                style={{
                  color: "#d32f2f",
                  marginTop: "6px",
                  fontSize: "0.9rem",
                }}
              >
                {quantityWarning}
              </p>
            )}
          </div>
        </div>

        <div className="buttons">
          <span>
            {isSellMode ? "Estimated Sell Value" : "Margin Required"}: ₹
            {orderValue.toFixed(2)}
          </span>

          <div>
            {isSellMode ? (
              <button
                className="btn btn-blue rounded-3"
                style={{backgroundColor: "#ff5722"}}
                onClick={handleSellClick}
                disabled={!isQuantityValid}
              >
                Sell
              </button>
            ) : (
              <button
                className="btn btn-blue rounded-3"
                onClick={handleBuyClick}
                disabled={!isQuantityValid}
              >
                Buy
              </button>
            )}

            <Link to="" className="btn btn-grey rounded-3" onClick={closeBuyWindow}>
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyActionWindow;
