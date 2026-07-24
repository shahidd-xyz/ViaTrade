import React from "react";

function Hero() {
  const handleClick = () => {
    window.location.href = "https://viatrade-dashboard.vercel.app/signup";
  };

  return (
    <div className="container p-5">
      <div className="row text-center">
        <img
          src="media/images/homeHero.png"
          alt="Home Hero Image"
          className="mb-3 img-fluid"
          style={{ width: "70%", margin: "0 auto" }}
        />

        <h1 className="mt-5">Invest in everything</h1>
        <p>
          Online platform to invest in stocks, derivatives, mutual funds, ETFs,
          bonds, and more.
        </p>

        <button
          className="p-3 btn btn-primary fs-5 mb-5 mt-2"
          style={{ width: "25%", margin: "0 auto" }}
          onClick={handleClick}
        >
          Sign up for free
        </button>
      </div>
    </div>
  );
}

export default Hero;
