import React from "react";

import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";

function ProductPage() {
  return (
    <>
      <Hero></Hero>
      <LeftSection
        imageUrl="media/images/kite.png"
        productName="Kite"
        productDescription="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices."
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
      />
      <RightSection
        imageUrl="media/images/console.png"
        productName="Console"
        productDescription="Zerodha Console is a comprehensive back-office platform that enables users to monitor and manage their trading and investment activities efficiently. It provides detailed reports, portfolio analytics, transaction history, and tax-related statements through a centralized dashboard. With its intuitive interface and advanced reporting capabilities, Console simplifies portfolio management and helps users make informed financial decisions."
        learnMore=""
        linkText="Learn More"
      />
      <LeftSection
        imageUrl="media/images/coin.png"
        productName="Coin"
        productDescription="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices."
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
      />
      <RightSection
        imageUrl="media/images/kiteconnect.png"
        productName="Kite Connect API"
        productDescription="Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase."
        learnMore=""
        linkText="Kite Connect"
      />

      <LeftSection
        imageUrl="media/images/varsity.png"
        productName="Varsity Mobile"
        productDescription="An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go."
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
      />

      <h4 className="text-center mt-5 p-5">Want to know more about our technology stack? Check out the <a href="https://viatrade-dashboard.vercel.app/signup" style={{textDecoration: "none"}}>ViaTrade.tech</a> blog.</h4>
      <Universe />
    </>
  );
}

export default ProductPage;
