const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user/User");
const ErrorResponse = require("../utils/errorResponse");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || "";

  if (authHeader.startsWith("Bearer")) {
    try {
      // extract header from authHeader string
      token = authHeader.split(" ")[1];

      // verified token returns user id
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);


      // find user's obj in db and assign to the req.user
      // req.user = await User.findById(decoded.id).select("-password");
      req.user = await User.findById(decoded.id);

      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Not authorized. No token!",
    })
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, resp, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorResponse(`User role ${req.user.role} is not authorised to access this route`, 403));
    }
    next();
  }
}