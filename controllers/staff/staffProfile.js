const Staff = require("../../models/staff/staffModel.js");
const School = require("../../models/staff/schoolRecordModel");
const Certification = require("../../models/staff/certificationModel");
const EmploymentRecord = require("../../models/staff/employmentRecordsModel");
const Guarantor = require("../../models/staff/guarantorModel");
const NextOfKin = require("../../models/staff/nextOfKinModel");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../../utils/errorResponse");

exports.getStaffProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const employee = await Staff.findOne({ user: userId }).populate({
    path: "user",
    select: "email active username",
    model: "User",
  });
  if (!employee)
    return next(
      new ErrorResponse("No employee account was found for this user", 404)
    );
  
  let schools = await School.find({ employee: userId });
  let certifications = await Certification.find({ employee: userId });
  let employment = await EmploymentRecord.find({ employee: userId });
  let guarantor = await Guarantor.find({ employee: userId });
  let nextofKin = await NextOfKin.find({ employee: userId });

  res.status(200).json({
    success: true,
    message: "Account Retrieved Successfully!",
    data: {
      "profile": employee,
      schools,
      certifications,
      employment,
      guarantor,
      nextofKin
    }
  });
});

exports.createStaffProfile = asyncHandler(async (req, res, next) => {
  const files = req.files;
  const userId = req.user.id;

  let staff = await Staff.findOne({ user: userId });
  if (staff) {
    return next(
      new ErrorResponse("Account already exists for this user!", 422)
    );
  }

  if (files) {
    const avatar = {
      name: files["avatar"][0].fieldname,
      file: files["avatar"][0].location,
    };

    const documents = files["documents"].map((file) => {
      return {
        name: file.fieldname,
        file: file.location,
      };
    });

    req.body.avatar = avatar;
    req.body.documents = documents;
  }

  req.body.user = userId;

  staff = await Staff.create(req.body);
  res.status(201).json({
    success: true,
    message: "Staff profile created successfully",
    data: staff,
  });
});

exports.updateStaffProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const file = req.file;

  let staff = await Staff.findOne({ user: userId });
  if (!staff)
    return next(
      new ErrorResponse("No staff account was found for this user", 404)
    );
  if (file) {
    const avatar = {
      name: file.fieldname,
      file: file.location,
    };
    req.body.avatar = avatar;
  }

  staff = await Staff.findOneAndUpdate({ user: userId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    message: "Account update successful",
    data: staff,
  });
});

exports.uploadDocument = asyncHandler(async (req, res, next) => {
  const files = req.files;
  const staffId = req.user.id;
  const staff = await Staff.findOne({ user: staffId });
  if (!staff) {
    return next(
      new ErrorResponse("No staff account was found for this user", 404)
    );
  }

  if (!files || !Array.isArray(files) || files.length === 0) {
    return next(new ErrorResponse("No files were uploaded", 400));
  }

  const documents = files.map((file) => {
    return {
      name: file.fieldname,
      file: file.location,
    };
  });

  staff.documents.push(...documents);
  await staff.save();

  res.status(200).json({
    success: true,
    message: "Files uploaded successfully",
    data: staff,
  });
});

exports.deleteStaffProfile = asyncHandler(async (req, res, next) => {
  const staffID = req.user.id;
  const staff = await Staff.findOne({ user: staffID });
  if (!staff)
    return next(
      new ErrorResponse("No staff account was found for this user", 404)
    );

  await Staff.findOneAndDelete({ user: staffID });
  res.status(200).json({
    success: true,
    message: "Account deleted successfully!",
  });
});

// write logic to remove a document in doc array
exports.removeStaffDoc = asyncHandler(async (req, res, next) => {
  const staffID = req.user.id;
  const staff = await Staff.findOne({ user: staffID });
  if (!staff)
    return next(
      new ErrorResponse("No staff account was found for this user", 404)
    );

  await Staff.updateOne(
    { user: staffID },
    { $pull: { documents: { _id: req.params.id } } }
  );

  res.status(200).json({
    success: true,
    message: "document removed successfully!",
  });
});

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




