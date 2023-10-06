const NextOfKin = require("../../models/staff/nextOfKinModel");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../../utils/errorResponse");

exports.createNextOfKinRecord = asyncHandler(async (req, res, next) => {
  req.body.employee = req.user.id;

  let nextOfKin = await NextOfKin.create(req.body);

  res.status(201).json({
    success: true,
    message: "nextOfKin record created successfully",
    data: nextOfKin,
  });
});

exports.getNextOfKinRecord = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  let nextOfKin = await NextOfKin.find({ employee: userId });

  if (nextOfKin == "") {
    return next(
      new ErrorResponse("No nextOfKin records found for this employee", 404)
    );
  }

  res.status(200).json({
    success: true,
    message: "nextOfKin records successfully found for this employee",
    data: nextOfKin,
  });
});


