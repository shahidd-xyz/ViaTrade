import React, { useState, useContext, useEffect } from "react";

import Tooltip from "@mui/material/Tooltip";
import Grow from "@mui/material/Grow";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  BarChartOutlined,
  MoreHoriz,
} from "@mui/icons-material";

import GeneralContext from "./GeneralContext";

const WatchList = () => {
  const { watchlist, fetchWatchlist } = useContext(GeneralContext);

  const [activeStock, setActiveStock] = useState(null);

  useEffect(() => {
    fetchWatchlist();

    const interval = setInterval(fetchWatchlist, 50000);

    return () => clearInterval(interval);
  }, [fetchWatchlist]);

  return (
    <div className="watchlist-container mt-3 rounded-top-4 rounded-start-0">
      <div className="search-container mt-3">
        <form action="/market">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search a stock"
            className="search"
          />
        </form>

        <span className="counts">{watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock) => (
          <WatchListItem
            key={stock.instrumentKey}
            stock={stock}
            isActive={activeStock === stock.instrumentKey}
            setActiveStock={setActiveStock}
          />
        ))}
      </ul>
    </div>
  );
};

export default WatchList;

function WatchListItem({ stock, isActive, setActiveStock }) {
  const handlePointerEnter = (e) => {
    if (e.pointerType === "mouse") {
      setActiveStock(stock.instrumentKey);
    }
  };

  const handlePointerLeave = (e) => {
    if (e.pointerType === "mouse") {
      setActiveStock(null);
    }
  };

  const handleItemClick = () => {
    const hasDesktopHover =
      window.matchMedia &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (hasDesktopHover) return;

    setActiveStock(isActive ? null : stock.instrumentKey);
  };

  return (
    <li
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleItemClick}
    >
      <div className="item">
        <Tooltip
          title={stock.symbol}
          placement="right"
          arrow
          TransitionComponent={Grow}
          enterDelay={300}
        >
          <p className={stock.isDown ? "down" : "up"}>{stock.symbol}</p>
        </Tooltip>

        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>

          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}

          <span className={`price ${stock.isDown ? "down" : "up"}`}>
            ₹{Number(stock.lastPrice).toFixed(2)}
          </span>
        </div>
      </div>

      {isActive && <WatchListActions stock={stock} />}
    </li>
  );
}

function WatchListActions({ stock }) {
  const { openBuyWindow } = useContext(GeneralContext);

  return (
    <span className="actions actions-open" onClick={(e) => e.stopPropagation()}>
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="buy" onClick={() => openBuyWindow(stock, "BUY")}>
            Buy
          </button>
        </Tooltip>

        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="sell" onClick={() => openBuyWindow(stock, "SELL")}>
            Sell
          </button>
        </Tooltip>

        <Tooltip
          title="Analytics"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>

        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
}
