import React from "react";

function Awards() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 p-3">
          <img src="media/images/largestBroker.svg" alt="Best Broker"/>
        </div>
        <div className="col-6 p-3 mt-5">
          <h2>Finest stock broker in India</h2>
          <p className="mb-5">
            2+ million clients contribute to over 15% of all volumes in India
            daily by trading and Investing
          </p>
          <div className="row">
            <div className="col-6">
              <ul>
                <li>
                  <p>Futures and Options</p>
                </li>
                <li>
                  <p>Commodity Derivatives</p>
                </li>
                <li>
                  <p>Currency Derivatives</p>
                </li>
              </ul>
            </div>
            <div className="col-6">
              <ul>
                <li>
                  <p>Stocks & IPOs</p>
                </li>
                <li>
                  <p>Direct Mutual Funds</p>
                </li>
                <li>
                  <p>Bonds and </p>
                </li>
              </ul>
            </div>
          </div>
          <img src="media/images/pressLogos.png" style={{width: "90%"}} className="mt-4"/>
        </div>
      </div>
    </div>
  );
}

export default Awards;
