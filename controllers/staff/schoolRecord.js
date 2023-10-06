const School = require("../../models/staff/schoolRecordModel");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../../utils/errorResponse");

exports.createSchoolRecords = asyncHandler(async (req, res, next) => {
  req.body.employee = req.user.id;
  const file = req.file;

  if (file) {
    const certificate = {
      name: file.fieldname,
      file: file.location,
    };
    req.body.certificate = certificate;
  }

  let school = await School.create(req.body);

  res.status(201).json({
    success: true,
    message: "school record created successfully",
    data: school,
  });
});

exports.getSchoolRecords = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  let schools = await School.find({ employee: userId });

  if (schools == "") {
    return next(
      new ErrorResponse("No School records found for this employee", 404)
    );
  }

  res.status(200).json({
    success: true,
    message: "School records successfully found for this employee",
    data: schools,
  });
});


