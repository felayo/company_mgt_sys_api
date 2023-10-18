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

