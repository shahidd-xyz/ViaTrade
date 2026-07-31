const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://viatrade.onrender.com"
    : "http://localhost:8080";

export default API_URL;