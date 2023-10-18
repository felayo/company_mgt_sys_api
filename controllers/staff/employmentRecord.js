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

