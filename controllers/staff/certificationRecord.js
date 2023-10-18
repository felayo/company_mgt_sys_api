const Certification = require("../../models/staff/certificationModel");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../../utils/errorResponse");

exports.createCertificationRecord = asyncHandler(async (req, res, next) => {
  req.body.employee = req.user.id;
  const file = req.file;

  if (file) {
    const certificate = {
      name: file.fieldname,
      file: file.location,
    };
    req.body.certificate = certificate;
  }

  let certification = await Certification.create(req.body);

  res.status(201).json({
    success: true,
    message: "certification record created successfully",
    data: certification,
  });
});



