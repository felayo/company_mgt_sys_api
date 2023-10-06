const EmploymentRecord = require("../../models/staff/employmentRecordsModel");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../../utils/errorResponse");

exports.createEmploymentRecord = asyncHandler(async (req, res, next) => {
  req.body.employee = req.user.id;

  let employment = await EmploymentRecord.create(req.body);

  res.status(201).json({
    success: true,
    message: "employment record created successfully",
    data: employment,
  });
});

exports.getEmploymentRecord = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  let employment = await EmploymentRecord.find({ employee: userId });

  if (employment == "") {
    return next(
      new ErrorResponse("No past employment records found for this employee", 404)
    );
  }

  res.status(200).json({
    success: true,
    message: "past employment records successfully found for this employee",
    data: employment,
  });
});


