import React, { useEffect, useState } from "react";

import SearchBar from "./SearchBar";
import SearchResults from "./SearchResult";
import StockDetails from "../StockDetails";

import {
    searchStocks,
    getQuote,
} from "../../services/stockApi";

const Search = () => {

    const [query, setQuery] = useState("");

    const [results, setResults] = useState([]);

    const [loading, setLoading] = useState(false);

    const [selectedStock, setSelectedStock] = useState(null);

    useEffect(() => {

        if (query.trim() === "") {
            setResults([]);
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

            setResults([]);

            setQuery(stock.trading_symbol);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="container">

            <h2 className="mb-4">
                Search Stocks
            </h2>

            <SearchBar
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <SearchResults
                results={results}
                loading={loading}
                onSelect={handleSelect}
            />

            <StockDetails
                stock={selectedStock}
            />

        </div>

    );
};

export default Search;