const Staff = require("../../models/staff/staffModel.js");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../../utils/errorResponse");

exports.getStaffProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const staff = await Staff.findOne({ user: userId }).populate({
    path: "user",
    select: "email",
    model: "User",
  });
  if (!staff)
    return next(
      new ErrorResponse("No staff account was found for this user", 404)
    );

  res.status(200).json({
    success: true,
    message: "Account Retrieved Successfully!",
    data: staff,
  });
});

exports.createStaffProfile = asyncHandler(async (req, res, next) => {
  const files = req.files;
  const userId = req.user.id;

  let staff = await Staff.findOne({ user: userId });
  if (staff) {
    return next(
      new ErrorResponse("Account already exists for this user!", 422)
    );
  }

  if (files) {
    const avatar = {
      name: files["avatar"][0].fieldname,
      file: files["avatar"][0].location,
    };

    const documents = files["documents"].map((file) => {
      return {
        name: file.fieldname,
        file: file.location,
      }
    })

    req.body.avatar = avatar;
    req.body.documents = documents;
  }


  req.body.user = userId;
  
  staff = await Staff.create(req.body);
  res.status(201).json({
    success: true,
    message: "Staff profile created successfully",
    data: staff,
  });
});


exports.updateStaffProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const file = req.file;

  let staff = await Staff.findOne({ user: userId });
  if (!staff)
    return next(
      new ErrorResponse("No staff account was found for this user", 404)
    );
  if (file) {
    const avatar = {
      name: file.fieldname,
      file: file.location,
    };
    req.body.avatar = avatar;
  }

  staff = await Staff.findOneAndUpdate({ user: userId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    message: "Account update successful",
    data: staff,
  });
});

exports.uploadDocument = asyncHandler(async (req, res, next) => {
  const files = req.files;
  const staffId = req.user.id;
  const staff = await Staff.findOne({ user: staffId });

  if (!staff) {
    return next(
      new ErrorResponse("No staff account was found for this user", 404)
    );
  }

  if (!files || !Array.isArray(files) || files.length === 0) {
    return next(new ErrorResponse("No files were uploaded", 400));
  }

  const documents = files.map((file) => {
    return {
      name: file.fieldname,
      file: file.location,
    };
  });

  staff.documents.push(...documents);
  await staff.save();

  res.status(200).json({
    success: true,
    message: "Files uploaded successfully",
    data: staff,
  });
});

exports.deleteStaffProfile = asyncHandler(async (req, res, next) => {
  const staffID = req.user.id;
  const staff = await Staff.findOne({ user: staffID });
  if (!staff)
    return next(
      new ErrorResponse("No staff account was found for this user", 404)
    );

  await Staff.findOneAndDelete({ user: staffID });
  res.status(200).json({
    success: true,
    message: "Account deleted successfully!",
  });
});
