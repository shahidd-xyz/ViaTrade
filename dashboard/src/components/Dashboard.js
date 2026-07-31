import React from "react";
import { Route, Routes } from "react-router-dom";

import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import Search from "./Search/Search";
import NotFound from "./NotFound";

import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  return (
    <GeneralContextProvider>
      <div className="dashboard-container">
        <WatchList />

        <div className="content">
          <Routes>
            <Route path="/" element={<Summary />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/funds" element={<Funds />} />
            <Route path="/search" element={<Search />} />
            <Route
              path="*"
              element={
                <div className="not-found-wrapper">
                  <NotFound />
                </div>
              }
            />

            <Route
              path="/watchlist"
              element={
                <div className="mobile-watchlist-page">
                  <WatchList />
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </GeneralContextProvider>
  );
};

export default Dashboard;
