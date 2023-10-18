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

