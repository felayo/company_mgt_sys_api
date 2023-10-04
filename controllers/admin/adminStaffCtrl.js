const ErrorResponse = require("../../utils/errorResponse.js");
const Staff = require("./../../models/staff/staffModel.js");
const User = require("../../models/user/User.js");
const asyncHandler = require("express-async-handler");

exports.adminGetAllStaff = asyncHandler(async (req, res, next) => {
  const staffs = await Staff.find().populate({
    path: 'user',
    select: 'email active username',
    model: 'User'
  })
  if (staffs.length < 1) return next(new ErrorResponse("No record yet!", 404));

  res.status(200).json({
    success: true,
    message: "Fetched all staffs successfully",
    data: staffs,
  });
});

exports.adminGetOneStaff = asyncHandler(async (req, res, next) => {
  const staffProfileID = req.params.userId;
  const staff = await Staff.findById(staffProfileID).populate({
    path: 'user',
    select: 'email active',
    model: 'User'
  });
  if (!staff)
    return next(new ErrorResponse("No staff with that id was found!", 404));

  res.status(200).json({
    success: true,
    message: "Staff search successful",
    data: staff,
  });
});

exports.adminCreateStaffProfile = asyncHandler(async (req, res, next) => {
  const file = req.file;
  const userId = req.params.userId;

  let staff = await Staff.findOne({ user: userId });
  if (staff) {
    return next(
      new ErrorResponse("Account Profile already exists for this user!", 422)
    );
  }

  // Confirm if the userId is present in user table
  let user = await User.findOne({ _id: userId });
  if (!user) {
    return next(
      new ErrorResponse("The user cannot be found!", 404)
    );
  }

  if (file) {
    const avatar = {
      name: file.fieldname,
      file: file.path,
    };
    req.body.avatar = avatar;
  }
  req.body.user = req.params.userId;
  staff = await Staff.create(req.body);
  res.status(201).json({
    success: true,
    message: "Staff profile created successfully",
    data: staff,
  });
});

exports.adminUpdateStaff = asyncHandler(async (req, res, next) => {
  const staffProfileID = req.params.userId;
  let staff = await Staff.findById(staffProfileID);

  if (!staff)
    return next(
      new ErrorResponse("No staff account was found for this user", 404)
    );

  staff = await Staff.findByIdAndUpdate(staffProfileID, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Staff updated successfully",
    data: staff,
  });
});

exports.adminDeleteStaff = asyncHandler(async (req, res, next) => {
  const staffProfileID = req.params.userId;
  let staff = await Staff.findById(staffProfileID);
  if (!staff)
    return next(
      new ErrorResponse("No staff account was found with this id", 404)
    );

  staff = await Staff.findByIdAndDelete(staffProfileID);
  res.status(200).json({
    success: true,
    message: "Staff deleted successfully",
  });
});
