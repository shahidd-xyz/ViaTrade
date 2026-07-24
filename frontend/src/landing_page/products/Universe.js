import React from "react";

function Universe() {
  const handleClick = () => {
    window.location.href = "https://viatrade-dashboard.vercel.app/signup";;
  }

  return (
    <div className="container mt-5">
      <div className="row text-center p-5">
        <h3 className="mb-3 mt-5">The ViaTrade Universe</h3>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/zerodhaFundhouse.png" alt="Universe" style={{width: "70%"}}/>
          <p className="text-small text-muted mt-5">
            Our asset management venture that is creating simple and transparent
            index funds to help you save for your goals.
          </p>
        </div>

        <div className="col-4 p-3 mt-5 pt-5">
          <img src="media/images/sensibullLogo.svg" alt="Universe" style={{width: "70%"}}/>
          <p className="text-small text-muted mt-5">
            Options trading platform that lets you create strategies, analyze
            positions, and examine data points like open interest, FII/DII, and
            more.
          </p>
        </div>

        <div className="col-4 p-3 mt-5">
          <img src="media/images/goldenpiLogo.png" alt="Universe" style={{width: "70%"}}/>
          <p className="text-small text-muted mt-5">
            Investment research platform that offers detailed insights on
            stocks, sectors, supply chains, and more.
          </p>
        </div>

        <div className="col-4 p-3 mt-5">
          <img src="media/images/streakLogo.png" alt="Universe" style={{width: "50%"}}/>
          <p className="text-small text-muted mt-5">
            Systematic trading platform that allows you to create and backtest
            strategies without coding.
          </p>
        </div>

        <div className="col-4 p-3 mt-5">
          <img src="media/images/smallcaseLogo.png" alt="Universe" style={{width: "70%"}}/>
          <p className="text-small text-muted mt-5">
            Thematic investing platform that helps you invest in diversified
            baskets of stocks on ETFs.
          </p>
        </div>

        <div className="col-4 p-3 mt-5">
          <img src="media/images/dittoLogo.png" alt="Universe" style={{width: "40%"}}/>
          <p className="text-small text-muted mt-5">
            Personalized advice on life and health insurance. No spam and no
            mis-selling.
          </p>
        </div>

        <button
          className="p-3 btn btn-primary fs-5 mb-5 mt-5"
          style={{ width: "25%", margin: "0 auto" }}
          onClick={handleClick}
        >Sign up for free</button>
      </div>
    </div>
  );
}

export default Universe;
