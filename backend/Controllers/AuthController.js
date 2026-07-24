const { UserModel } = require("../model/UserModel");

module.exports.Signup = async (req, res) => {
  try {
    const user = new UserModel({
      username: req.body.username,
      email: req.body.email,
    });

    await UserModel.register(user, req.body.password);

    res.json({
      success: true,
      message: "Registered Successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.Login = (req, res) => {
  console.log("LOGIN");
  console.log("Session ID:", req.sessionID);
  console.log("Session:", req.session);
  console.log("User:", req.user);
  console.log("Authenticated:", req.isAuthenticated());

  res.json({
    success: true,
    user: req.user,
  });
};

module.exports.Logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    res.json({
      success: true,
    });
  });
};
