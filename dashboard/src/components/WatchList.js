import React from "react";
import { useState, useContext } from "react";

import Tooltip from "@mui/material/Tooltip";
import Grow from "@mui/material/Grow";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  BarChartOutlined,
  MoreHoriz,
} from "@mui/icons-material";

import GeneralContext from "./GeneralContext";

import { watchlist } from "../data/data";

const WatchList = () => {
  const [activeStock, setActiveStock] = useState(null);

  return (
    <div className="watchlist-container">
      <div className="search-container">
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
        {watchlist.map((stock, index) => {
          return (
            <WatchListItem
              stock={stock}
              key={index}
              isActive={activeStock === stock.name}
              setActiveStock={setActiveStock}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default WatchList;

function WatchListItem({ stock, isActive, setActiveStock }) {
  const handlePointerEnter = (e) => {
    if (e.pointerType === "mouse") {
      setActiveStock(stock.name);
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

    setActiveStock(isActive ? null : stock.name);
  };

  return (
    <li
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleItemClick}
    >
      <div className="item">
        <Tooltip
          title={stock.name}
          placement="right"
          arrow
          TransitionComponent={Grow}
          enterDelay={300}
        >
          <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        </Tooltip>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className={`price ${stock.isDown ? "down" : "up"}`}>
            {stock.price}
          </span>
        </div>
      </div>

      {isActive && <WatchListActions uid={stock.name} />}
    </li>
  );
}

function WatchListActions({ uid }) {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid, "BUY");
  };

  const handleSellClick = () => {
    generalContext.openBuyWindow(uid, "SELL");
  };

  return (
    <span className="actions actions-open" onClick={(e) => e.stopPropagation()}>
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="buy" onClick={handleBuyClick}>Buy</button>
        </Tooltip>

        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="sell" onClick={handleSellClick}>Sell</button>
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
