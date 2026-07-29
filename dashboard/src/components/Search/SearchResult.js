import React from "react";

const SearchResults = ({ results, loading, onSelect }) => {
    if (loading) {
        return (
            <div className="card mt-3">
                <div className="card-body text-center">
                    Loading...
                </div>
            </div>
        );
    }

    if (!results.length) return null;

    return (
        <div className="card mt-3 shadow-sm">
            <ul className="list-group list-group-flush">
                {results.map((stock) => (
                    <li
                        key={stock.instrument_key}
                        className="list-group-item list-group-item-action"
                        style={{ cursor: "pointer" }}
                        onClick={() => onSelect(stock)}
                    >
                        <div className="fw-bold">
                            {stock.trading_symbol}
                        </div>

                        <small className="text-muted">
                            {stock.name}
                        </small>

                        <div className="small text-secondary">
                            {stock.exchange}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;