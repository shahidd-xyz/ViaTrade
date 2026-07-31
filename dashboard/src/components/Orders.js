import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../config/api";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/allOrders`, {
          withCredentials: true,
        });

        setAllOrders(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

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

          {allOrders.map((stock, index) => {
            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.price * stock.qty}</td>
                <td>{stock.mode}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Orders;
