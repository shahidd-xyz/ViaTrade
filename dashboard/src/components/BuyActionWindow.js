import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode = "BUY" }) => {
  const { closeBuyWindow } = useContext(GeneralContext);

  const isSellMode = mode === "SELL";
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [maxSellQty, setMaxSellQty] = useState(0);
  const numericQuantity = Number(stockQuantity) || 0;
  const orderValue = stockPrice * numericQuantity;

  useEffect(() => {
    setStockQuantity(1);
  }, [uid, mode]);

  useEffect(() => {
    let mounted = true;

    const fetchPrice = async () => {
      try {
        const res = await axios.get("https://viatrade.onrender.com/getCurrPrice", {
          params: { name: uid },
          withCredentials: true,
        });
        const match = res.data;
        if (match && mounted) setStockPrice(Number(match.price || 0));
      } catch (err) {
        console.warn("Could not fetch holdings", err);
      }
    };

    const fetchHoldings = async () => {
      try {
        const res = await axios.get("https://viatrade.onrender.com/allHoldings", {
          withCredentials: true,
        });
        const holdings = Array.isArray(res.data) ? res.data : [];
        const holding = holdings.find((item) => item.name === uid);
        if (mounted) {
          setMaxSellQty(Number(holding?.qty || 0));
        }
      } catch (err) {
        console.warn("Could not fetch holdings", err);
      }
    };

    fetchPrice();
    if (isSellMode) {
      fetchHoldings();
    } else {
      setMaxSellQty(0);
    }
    return () => (mounted = false);
  }, [uid, isSellMode]);

  const handleQuantityChange = (value) => {
    if (value === "") {
      setStockQuantity("");
      return;
    }

    const parsedValue = Math.max(0, Number(value));
    setStockQuantity(Number.isNaN(parsedValue) ? "" : parsedValue);
  };

  const isQuantityValid =
    numericQuantity > 0 && (!isSellMode || numericQuantity <= maxSellQty);
  const quantityWarning =
    isSellMode && numericQuantity > maxSellQty
      ? `You can sell up to ${maxSellQty} unit${maxSellQty === 1 ? "" : "s"}.`
      : "";

  const handleBuyClick = async () => {
    try {
      const response = await axios.post(
        "https://viatrade.onrender.com/newOrder",
        {
          name: uid,
          qty: numericQuantity,
          price: stockPrice,
          mode: "BUY",
        },
        { withCredentials: true },
      );

      if (response?.data?.message) {
        await axios.get("https://viatrade.onrender.com/allHoldings", {
          withCredentials: true,
        });
        await axios.get("https://viatrade.onrender.com/allOrders", {
          withCredentials: true,
        });
      }

      closeBuyWindow();
    } catch (err) {
      console.error("Buy order failed", err);
      alert(err?.response?.data?.message || "Buy order failed. Please log in and try again.");
    }
  };

  const handleSellClick = async () => {
    try {
      await axios.post(
        "https://viatrade.onrender.com/deleteOrder",
        {
          name: uid,
          qty: numericQuantity,
        },
        {
          withCredentials: true,
        },
      );

      await axios.get("https://viatrade.onrender.com/allHoldings", {
        withCredentials: true,
      });
      await axios.get("https://viatrade.onrender.com/allOrders", {
        withCredentials: true,
      });

      closeBuyWindow();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  return (
    <>
      <div className="buy-window-backdrop" onClick={handleCancelClick} />
      <div className="container" id="buy-window" draggable="true">
        <div className={`header ${isSellMode ? "sell-header" : ""}`}>
          <h3>
            {isSellMode ? "Sell" : "Buy"} {uid}
          </h3>
          <p className="market-options">NSE · Market order</p>
        </div>

        <div className="regular-order">
          <div className="inputs">
            <fieldset>
              <legend>Qty.</legend>
              <input
                type="number"
                name="qty"
                id="qty"
                min={1}
                max={isSellMode ? maxSellQty : undefined}
                onChange={(e) => handleQuantityChange(e.target.value)}
                value={stockQuantity}
              />
            </fieldset>
            <p>
              {isSellMode ? "Sell Value" : "Total Price"}: ₹{orderValue.toFixed(2)}
            </p>
            {isSellMode && <p>Max Qty Available: {maxSellQty}</p>}
            {isSellMode && quantityWarning && (
              <p
                style={{
                  color: "#d32f2f",
                  marginTop: "6px",
                  marginBottom: "0",
                  fontSize: "0.9rem",
                  display: "block",
                  width: "100%",
                }}
              >
                {quantityWarning}
              </p>
            )}
          </div>
        </div>

        <div className="buttons">
          <span>
            {isSellMode ? "Estimated Sell Value" : "Margin Required"}: ₹{orderValue.toFixed(2)}
          </span>
          <div>
            {isSellMode ? (
              <button
                type="button"
                className="btn btn-blue"
                onClick={handleSellClick}
                disabled={!isQuantityValid}
              >
                Sell
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-blue"
                onClick={handleBuyClick}
              >
                Buy
              </button>
            )}
            <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyActionWindow;
