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

