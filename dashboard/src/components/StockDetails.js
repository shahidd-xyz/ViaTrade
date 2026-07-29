import React from "react";

const StockDetails = ({ stock }) => {

    if (!stock) return null;

    return (
        <div className="card shadow mt-4">

            <div className="card-header">
                <h4>{stock.symbol}</h4>
            </div>

            <div className="card-body">

                <h2 className="text-success">
                    ₹ {stock.lastPrice}
                </h2>

                <p>
                    Change :
                    <strong className="ms-2">
                        {stock.change}
                    </strong>
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

                <button className="btn btn-success me-2">
                    Buy
                </button>

                <button className="btn btn-outline-primary">
                    Add to Watchlist
                </button>

            </div>

        </div>
    );
};

export default StockDetails;