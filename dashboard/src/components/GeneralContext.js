
import React, { useState, useCallback, useMemo } from "react";
import axios from "axios";

import BuyActionWindow from "./BuyActionWindow";
import API_URL from "../config/api";

const GeneralContext = React.createContext({
  openBuyWindow: () => {},
  closeBuyWindow: () => {},

  watchlist: [],
  fetchWatchlist: async () => {},
});

export const GeneralContextProvider = ({ children }) => {
  // -----------------------------
  // Buy / Sell Window State
  // -----------------------------
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedWindowMode, setSelectedWindowMode] = useState("BUY");

  // -----------------------------
  // Watchlist State
  // -----------------------------
  const [watchlist, setWatchlist] = useState([]);

  // -----------------------------
  // Fetch Watchlist
  // -----------------------------
  const fetchWatchlist = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_URL}/watchlist`, {
        withCredentials: true,
      });

      setWatchlist(data.stocks || []);
    } catch (err) {
      console.error("Failed to fetch watchlist:", err);
    }
  }, []);

  // -----------------------------
  // Open Buy / Sell Window
  // -----------------------------
  const openBuyWindow = useCallback((stock, mode = "BUY") => {
    setSelectedStock(stock);
    setSelectedWindowMode(mode);
    setIsBuyWindowOpen(true);
  }, []);

  // -----------------------------
  // Close Buy / Sell Window
  // -----------------------------
  const closeBuyWindow = useCallback(() => {
    setSelectedStock(null);
    setSelectedWindowMode("BUY");
    setIsBuyWindowOpen(false);
  }, []);

  // -----------------------------
  // Context Value
  // -----------------------------
  const value = useMemo(
    () => ({
      openBuyWindow,
      closeBuyWindow,

      watchlist,
      fetchWatchlist,
    }),
    [openBuyWindow, closeBuyWindow, watchlist, fetchWatchlist],
  );

  return (
    <GeneralContext.Provider value={value}>
      {children}

      {isBuyWindowOpen && selectedStock && (
        <BuyActionWindow stock={selectedStock} mode={selectedWindowMode} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
