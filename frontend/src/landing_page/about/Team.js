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
            style={{ borderRadius: "100%", width: "75%", height: "105vh"}}
          />
          <h4 className="mt-5">Shahid Ansari</h4>
          <h6 className="mt-4 text-muted">Founder, CEO</h6>
        </div>
        <div className="col-6 p-5">
            <p>As a Software Engineer, I am committed to building reliable and scalable software that solves real-world problems. I approach every project with analytical thinking, precision, and attention to quality. I believe in creating maintainable solutions that deliver long-term value. Continuous learning and professional growth remain central to my development.</p>
            <p>I value clean software design, structured problem-solving, and consistent engineering practices. Every challenge is an opportunity to develop efficient and practical solutions. I strive to deliver work that balances quality, performance, and reliability. Collaboration, adaptability, and accountability guide my professional approach.</p>
            <p>My objective is to contribute to meaningful products while maintaining high engineering standards. I continuously improve my knowledge to stay aligned with evolving industry practices. I am driven by curiosity, discipline, and a commitment to excellence. I aim to create software that delivers lasting impact and measurable value.</p>
            <p>Connect on <a href="/" style={{textDecoration: "none"}}>Homepage</a> / <a href="/support" style={{textDecoration: "none"}}>TradingQ&A</a> / <a href="https://x.com" style={{textDecoration: "none"}}>Twitter</a></p>
        </div>
      </div>
    </div>
  );
}

export default Team;
