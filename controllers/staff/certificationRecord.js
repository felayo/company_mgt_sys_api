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

exports.getCertificationRecord = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  let certification = await Certification.find({ employee: userId });

  if (certification == "") {
    return next(
      new ErrorResponse("No certification records found for this employee", 404)
    );
  }

  res.status(200).json({
    success: true,
    message: "Certification records successfully found for this employee",
    data: certification,
  });
});


