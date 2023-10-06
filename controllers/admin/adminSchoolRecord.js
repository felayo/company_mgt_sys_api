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

exports.getEmployeeSchoolRecords = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;

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
