// Route handler: returns current user if authenticated
// module.exports.isLoggedIn = (req, res) => {
//   if (req.isAuthenticated && req.isAuthenticated()) {
//     return res.json({
//       success: true,
//       user: {
//         _id: req.user._id,
//         username: req.user.username,
//         email: req.user.email,
//       },
//     });
//   }

//   return res.status(401).json({ success: false, message: "Not authenticated" });
// };




// Middleware: ensure the request is authenticated, else return 401
module.exports.ensureAuth = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.status(401).json({ success: false, message: "Not authenticated" });
};