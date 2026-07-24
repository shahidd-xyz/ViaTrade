import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 border-top pb-0">
        <h2 className="text-center fw-medium">People</h2>
      </div>

      <div
        className="row p-5 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-5 text-center">
          <img
            src="media/images/shahid_image.jpeg"
            alt="Founder"
            style={{ borderRadius: "100%", width: "65%" }}
          />
          <h4 className="mt-5">Nithin Kamath</h4>
          <h6 className="mt-4 text-muted">Founder, CEO</h6>
        </div>
        <div className="col-6 p-5">
            <p>Nithin bootstrapped and founded Zerodha in 2010 to overcome the hurdles he faced during his decade long stint as a trader. Today, Zerodha has changed the landscape of the Indian broking industry.</p>
            <p>He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).</p>
            <p>Playing basketball is his zen.</p>
            <p>Connect on <a href="/" style={{textDecoration: "none"}}>Homepage</a> / <a href="/support" style={{textDecoration: "none"}}>TradingQ&A</a> / <a href="https://x.com" style={{textDecoration: "none"}}>Twitter</a></p>
        </div>
      </div>
    </div>
  );
}

export default Team;
