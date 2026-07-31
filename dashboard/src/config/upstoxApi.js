const UPSTOX_API_URL =
  process.env.NODE_ENV === "production"
    ? "https://viatrade-upstox.onrender.com"
    : "http://localhost:8090";

export default UPSTOX_API_URL;