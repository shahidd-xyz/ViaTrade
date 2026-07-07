import React from "react";

function OpenAccount() {
  const handleClick = () => {
    window.location.href = "http://localhost:3000/signup"
  }

  return (
    <div className="container p-5 mt-5 mb-5">
      <div className="row text-center">
        <h2 className="mt-5">Open a ViaTrade Account</h2>
        <p>
          Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
          F&O trades.
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

export default OpenAccount;
