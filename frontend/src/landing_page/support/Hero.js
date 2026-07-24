import React from "react";

function Hero() {
  return (
    <div className="container-fluid" id="supportHero">
      <div className="p-4" id="supportWrapper">
        <h2 className="fs-3">Support Portal</h2>
        <h2 className="fs-4"><a href="https://viatrade-dashboard.vercel.app/signup" style={{textDecoration: "none"}}>Track Tickets</a></h2>
      </div>

      <div className="row p-5 m-3">
        <div className="col-6 p-5">
          <h1 className="fs-3">Search for an answer or browse help topics to create a ticket</h1>
          <input
            type="text"
            placeholder="Eg: how do i activate F&O, why is my order getting rejected..."
            className="mt-3"
          />
          <br />
          <a href="https://viatrade-dashboard.vercel.app/signup">Track account opening</a>
          <a href="https://viatrade-dashboard.vercel.app/signup" className="ms-4">Track segment activation</a>
          <a href="https://viatrade-dashboard.vercel.app/signup" className="ms-4">Intraday margins</a>
          <a href="https://viatrade-dashboard.vercel.app/signup" className="ms-4">Kite user manual</a>
        </div>
        <div className="col-6 p-5">
          <h1 className="fs-3">Featured</h1>
          <ol type="1">
            <li>
              <a href="https://viatrade-dashboard.vercel.app/signup" className="mt-3">Current Takeovers and Delisting - January 2026</a>
            </li>
            <li className="mt-3">
              <a href="https://viatrade-dashboard.vercel.app/signup">Latest Intraday leverages - MIS & CO</a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Hero;
