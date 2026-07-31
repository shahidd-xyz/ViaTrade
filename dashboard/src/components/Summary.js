import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";

const Summary = () => {
  const navigate = useNavigate();

  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    async function isAuth() {
      try {
        await axios(`${API_URL}/isUser`, {
          withCredentials: true,
        });
      } catch (err) {
        alert("You're not logged in");
        navigate("/login");
      }
    }
    isAuth();

    async function getHoldingsAtDashboard() {
      const response = await axios.get(
        `${API_URL}/allHoldings`,
        {
          withCredentials: true,
        },
      );

      setHoldings(response.data);
    }
    getHoldingsAtDashboard();
  }, [navigate]);

  const totalHoldingsValue = holdings.reduce(
    (total, holding) => total + holding.qty * holding.price,
    0,
  );

  const totalInvestment = holdings.reduce(
    (total, holding) => total + holding.qty * holding.avg,
    0,
  );

  const profitLoss = totalHoldingsValue - totalInvestment;

  const profitLossPercent =
    totalInvestment > 0 ? ((profitLoss / totalInvestment) * 100).toFixed(2) : 0;

  return (
    <>
      <div className="username">
        <h6 className="fs-3">Hi, User!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>24k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>{totalHoldingsValue.toFixed(2)}</span>{" "}
            </p>
            <p>
              Opening balance <span>None</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={profitLoss >= 0 ? "profit" : "loss"}>
              ₹{profitLoss.toFixed(2)}
              <small>{profitLossPercent}%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{totalHoldingsValue.toFixed(2)}</span>{" "}
            </p>
            <p>
              Investment <span>{totalInvestment.toFixed(2)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
