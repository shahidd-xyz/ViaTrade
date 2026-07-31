import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from "./Menu";

const TopBar = () => {
  const [indices, setIndices] = useState({
    nifty: {
      price: 0,
      change: 0,
    },
    sensex: {
      price: 0,
      change: 0,
    },
  });

  const fetchIndices = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8090/auth/upstox/indices",
      );

      setIndices(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchIndices();

    const interval = setInterval(fetchIndices, 50000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className={indices.sensex.change >= 0 ? "up" : "down"} style={{fontSize: "12px"}}>{indices.nifty.price.toFixed(2)}</p>
          <p className={indices.nifty.change >= 0 ? "up" : "down"} style={{fontSize: "12px"}}>
            {indices.nifty.change.toFixed(2)}
          </p>
        </div>

        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className={indices.sensex.change >= 0 ? "up" : "down"} style={{fontSize: "12px"}}>{indices.sensex.price.toFixed(2)}</p>
          <p className={indices.sensex.change >= 0 ? "up" : "down"} style={{fontSize: "12px"}}>
            {indices.sensex.change.toFixed(2)}
          </p>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;
