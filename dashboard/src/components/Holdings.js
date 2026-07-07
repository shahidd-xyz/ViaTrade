import React, { useEffect, useState } from "react";
import axios from "axios";

import { VerticalGraph } from "./VerticalGraph";
import { DoughnutChart } from "./DoughnutChart";

// import { holdings } from "../data/data";

function Holdings() {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/allHoldings", {withCredentials: true}).then((res) => {
      console.log(res.data);
      setAllHoldings(res.data);
    });
  }, []);


  //Chartjs - VerticalGraph

  const labels = allHoldings.map((subArray) => subArray["name"]);

  const verticalGraphData = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(225, 99, 132, 0.6)",
      },
    ],
  };


  //Chartjs - DoughnutChart

  const doughnutChartData = {
    labels,
    datasets: [
      {
        label: "Stock Quantity",
        data: allHoldings.map((stock) => stock.qty),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      }
    ]
  }

  //Calculating Total Investment and Current Value

  const totalInvestment = allHoldings.reduce(
    (sum, stock) => sum + stock.avg * stock.qty,
    0
  );

  const totalCurrentValue = allHoldings.reduce(
    (sum, stock) => sum + stock.price * stock.qty,
    0
  );

  const totalProfitLoss = totalCurrentValue - totalInvestment;
  const totalProfitLossPercent = (totalProfitLoss / totalInvestment) * 100;


  return (
    <>
      <h3 className="title fs-3">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Curr. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>

          {allHoldings.map((stock, index) => {
            const currVal = stock.price * stock.qty;
            const isProfit = currVal - stock.avg * stock.qty >= 0.0;
            const profitClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{currVal.toFixed(2)}</td>
                <td className={profitClass}>
                  {(currVal - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={profitClass}>{stock.net}</td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            {totalInvestment.toFixed(2)}<span></span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            {totalCurrentValue.toFixed(2)}<span></span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>{totalProfitLoss.toFixed(2)} ({Number.isFinite(totalProfitLossPercent) ? totalProfitLossPercent.toFixed(2) : 0}%)</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={verticalGraphData}/>
      <DoughnutChart data={doughnutChartData}/>
    </>
  );
}

export default Holdings;
