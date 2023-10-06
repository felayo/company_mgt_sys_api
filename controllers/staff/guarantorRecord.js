const Guarantor = require("../../models/staff/guarantorModel");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../../utils/errorResponse");

exports.createGuarantorRecord = asyncHandler(async (req, res, next) => {
  req.body.employee = req.user.id;

  let guarantor = await Guarantor.create(req.body);

  res.status(201).json({
    success: true,
    message: "guarantor record created successfully",
    data: guarantor,
  });
});

exports.getGuarantorRecord = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  let guarantor = await Guarantor.find({ employee: userId });

  if (guarantor == "") {
    return next(
      new ErrorResponse("No guarantor records found for this employee", 404)
    );
  }

  res.status(200).json({
    success: true,
    message: "guarantor records successfully found for this employee",
    data: guarantor,
  });
});


