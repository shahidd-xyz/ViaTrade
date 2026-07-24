import React from "react";

function LeftSection({
  imageUrl,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-6">
          <img src={imageUrl} alt="Left Section  Url" />
        </div>
        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDescription}</p>
          <div>
            <a href={tryDemo} style={{textDecoration: "none"}}>
              Try Demo <i class="fa-solid fa-arrow-right"></i>
            </a>
            <a href={learnMore} style={{ marginLeft: "10%", textDecoration: "none" }}>
              Learn More <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
          <div className="mt-3">
            <a href={googlePlay} style={{textDecoration: "none"}}>
              <img
                src="media/images/googlePlayBadge.svg"
                alt="Google Play"
                id="googleplay1"
              />
            </a>
            <a href={appStore}  style={{ marginLeft: "10%", textDecoration: "none" }}>
              <img src="media/images/appStoreBadge.svg" alt="App Store" id="googleplay2"/>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
