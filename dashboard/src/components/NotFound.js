import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <h1
        style={{
          fontSize: "7rem",
          fontWeight: "700",
          color: "#2563eb",
        }}
      >
        404
      </h1>

      <h2 className="mb-3">Page Not Found</h2>

      <p className="text-muted mb-4" style={{ maxWidth: "500px" }}>
        The page you are looking for doesn't exist or may have been moved.
      </p>

      <Link
        to="/"
        className="btn rounded-4"
        style={{
          background: "#2563eb",
          color: "#fff",
          padding: "10px 25px",
        }}
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
