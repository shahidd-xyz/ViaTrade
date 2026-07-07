import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(()=>{
    axios.get("https://viatrade.onrender.com/allOrders", {withCredentials:true}).then((res)=>{
      setAllOrders(res.data);
    });
  });

  return (
    <>
      <h3 className="title fs-3">Orders ({allOrders.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Price</th>
            <th>Mode</th>
          </tr>


          {allOrders.map((stock, index)=>{
            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{(stock.price)*(stock.qty)}</td>
                <td>{stock.mode}</td>
              </tr>
            )
          })}
        </table>
      </div>
    </>
  );
};

export default Orders;