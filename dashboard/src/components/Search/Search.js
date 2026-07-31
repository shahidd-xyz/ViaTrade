import React, { useEffect, useState } from "react";

import SearchBar from "./SearchBar";
import SearchResults from "./SearchResult";
import StockDetails from "../StockDetails";

import { searchStocks, getQuote } from "../../services/stockApi";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setSelectedStock(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const stocks = await searchStocks(query);

        setResults(stocks);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = async (stock) => {
    try {
      const quote = await getQuote(stock.instrument_key);

      setSelectedStock(quote);

      // Hide search results
      setResults([]);

      // Keep selected stock symbol in search box
      setQuery(stock.trading_symbol);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;

    setQuery(value);

    // If user starts typing again,
    // show search results instead of previous stock details
    if (value !== selectedStock?.symbol) {
      setSelectedStock(null);
    }
  };

  return (
    <div className="container-fluid px-0 px-lg-3">
      <h2 className="mt-3 mb-4 fw-bold">Search Stocks</h2>
      <SearchBar value={query} onChange={handleSearchChange} />

      {!selectedStock && (
        <SearchResults
          results={results}
          loading={loading}
          onSelect={handleSelect}
        />
      )}

      {selectedStock && <StockDetails stock={selectedStock} />}
    </div>
  );
};

export default Search;
