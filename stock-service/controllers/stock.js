const axios = require("axios");

const login = (req, res) => {
  const authUrl =
    `https://api.upstox.com/v2/login/authorization/dialog` +
    `?response_type=code` +
    `&client_id=${process.env.UPSTOX_API_KEY}` +
    `&redirect_uri=${encodeURIComponent(process.env.UPSTOX_REDIRECT_URI)}`;
  console.log(process.env.UPSTOX_API_KEY);
  console.log(process.env.UPSTOX_REDIRECT_URI);

  console.log(authUrl);

  res.redirect(authUrl);
};

const callback = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Authorization code not received",
      });
    }

    const response = await axios.post(
      "https://api.upstox.com/v2/login/authorization/token",
      new URLSearchParams({
        code,
        client_id: process.env.UPSTOX_API_KEY,
        client_secret: process.env.UPSTOX_API_SECRET,
        redirect_uri: process.env.UPSTOX_REDIRECT_URI,
        grant_type: "authorization_code",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      },
    );

    const accessToken = response.data.access_token;

    console.log("Access Token:", accessToken);

    // Later you can save this in DB or Redis
    global.accessToken = accessToken;

    res.json({
      success: true,
      message: "Authentication successful",
      accessToken,
    });
  } catch (err) {
    console.error(err.response?.data || err.message);

    res.status(500).json({
      success: false,
      message: "Authentication failed",
      error: err.response?.data || err.message,
    });
  }
};

module.exports = {
  login,
  callback,
};
