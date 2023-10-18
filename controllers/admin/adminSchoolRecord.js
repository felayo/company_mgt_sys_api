const School = require("../../models/staff/schoolRecordModel");
const Staff = require("../../models/staff/staffModel");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../../utils/errorResponse");

exports.createSchoolRecords = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const file = req.file;

  if (file) {
    const certificate = {
      name: file.fieldname,
      file: file.location,
    };
    req.body.certificate = certificate;
  }

  let employee = await Staff.findOne({ user: userId });

  if (!employee) {
    return next(new ErrorResponse("no employee profile found", 404));
  }

  req.body.employee = userId;

  let school = await School.create(req.body);

  res.status(201).json({
    success: true,
    message: "school record created successfully",
    data: school,
  });
});
