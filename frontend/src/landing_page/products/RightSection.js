import React from "react";

function RightSection({
  imageUrl,
  productName,
  productDescription,
  learnMore,
  linkText,
}) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 p-5 mt-5">
          <h1  className="mt-5">{productName}</h1>
          <p>{productDescription}</p>
          <div>
            <a href={learnMore} style={{ textDecoration: "none" }}>
            {linkText}<i class="fa-solid fa-arrow-right"></i>
          </a>
          </div>
        </div>
        <div className="col-6">
          <img src={imageUrl} alt="Right Section Url" />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
