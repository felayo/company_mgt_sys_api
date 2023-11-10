const ErrorResponse = require("../../utils/errorResponse");
const asyncHandler = require("express-async-handler");
const User = require("../../models/user/User");
const jwt = require("jsonwebtoken");

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, username, password, role } = req.body;

  // check if user exists
  let foundEmail = await User.findOne({ email });
  if (foundEmail) return next(new ErrorResponse("Email already exists", 400));

  let foundUsername = await User.findOne({ username });
  if (foundUsername)
    return next(new ErrorResponse("Username already exists", 400));

  // Create user
  const user = await User.create({
    name,
    email,
    username,
    password,
    role,
  });

  sendTokenResponse(user, 200, res);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Account not found", 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

exports.refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findOne({
        email: decoded.email,
      }).exec();

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const token = jwt.sign(
        { id: foundUser._id, role: foundUser.role, email: foundUser.email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_JWT_EXPIRE,
        }
      );

      res.json({ token });
    })
  );
};

exports.updatePassword = asyncHandler(async (req, res, next) => {
  user = await User.findById(req.user.id).select("+password");

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse("Password is incorrect", 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

exports.logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ success: true, message: "Cookie cleared" });
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const refreshToken = jwt.sign(
    { email: user.email, username: user.username },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_JWT_EXPIRE,
    }
  );

  const options = {
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    httpOnly: true,
    sameSite: "None", //cross-site cookie
    secure: true,
  };

  res.status(statusCode).cookie("jwt", refreshToken, options).json({
    success: true,
    token,
  });
};
