const ErrorResponse = require("../../utils/errorResponse.js");
const Staff = require("./../../models/staff/staffModel.js");
const School = require("../../models/staff/schoolRecordModel");
const Certification = require("../../models/staff/certificationModel");
const EmploymentRecord = require("../../models/staff/employmentRecordsModel");
const Guarantor = require("../../models/staff/guarantorModel");
const NextOfKin = require("../../models/staff/nextOfKinModel");
const User = require("../../models/user/User.js");
const asyncHandler = require("express-async-handler");

exports.adminGetAllStaff = asyncHandler(async (req, res, next) => {
  const staffs = await Staff.find().populate({
    path: "user",
    select: "email active username",
    model: "User",
  });
  if (staffs.length < 1) return next(new ErrorResponse("No record yet!", 404));

  res.status(200).json({
    success: true,
    message: "Fetched all staffs successfully",
    data: staffs,
  });
});

exports.adminGetOneStaff = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const employee = await Staff.findOne({ user: userId }).populate({
    path: "user",
    select: "email active",
    model: "User",
  });
  if (!employee)
    return next(new ErrorResponse("No employee with that id was found!", 404));

  let schools = await School.find({ employee: userId });
  let certifications = await Certification.find({ employee: userId });
  let employment = await EmploymentRecord.find({ employee: userId });
  let guarantor = await Guarantor.find({ employee: userId });
  let nextofKin = await NextOfKin.find({ employee: userId });

  res.status(200).json({
    success: true,
    message: "Staff search successful",
    data: {
      profile: employee,
      schools,
      certifications,
      employment,
      guarantor,
      nextofKin,
    },
  });
});

exports.adminCreateStaffProfile = asyncHandler(async (req, res, next) => {
  const file = req.file;
  const userId = req.params.userId;

  let staff = await Staff.findOne({ user: userId });
  if (staff) {
    return next(
      new ErrorResponse("Account Profile already exists for this user!", 422)
    );
  }

  // Confirm if the userId is present in user table
  let user = await User.findOne({ _id: userId });
  if (!user) {
    return next(new ErrorResponse("The user cannot be found!", 404));
  }

  if (file) {
    const avatar = {
      name: file.fieldname,
      file: file.location,
    };
    req.body.avatar = avatar;
  }

  req.body.user = req.params.userId;
  staff = await Staff.create(req.body);
  res.status(201).json({
    success: true,
    message: "Staff profile created successfully",
    data: staff,
  });
});

exports.adminUpdateStaff = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
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
    message: "Staff updated successfully",
    data: staff,
  });
});


exports.uploadDocument = asyncHandler(async (req, res, next) => {
  const files = req.files;
  const userId = req.params.userId;
  const staff = await Staff.findOne({ user: userId });
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

exports.removeStaffDoc = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const documentId = req.params.documentId;
  const staff = await Staff.findOne({ user: userId });
  if (!staff)
    return next(
      new ErrorResponse("No staff account was found for this user", 404)
    );

  await Staff.updateOne(
    { user: userId },
    { $pull: { documents: { _id: documentId } } }
  );

  res.status(200).json({
    success: true,
    message: "document removed successfully!",
  });
});

exports.adminDeleteStaff = asyncHandler(async (req, res, next) => {
  const staffProfileID = req.params.userId;
  let staff = await Staff.findById(staffProfileID);
  if (!staff)
    return next(
      new ErrorResponse("No staff account was found with this id", 404)
    );

  staff = await Staff.findByIdAndDelete(staffProfileID);
  res.status(200).json({
    success: true,
    message: "Staff deleted successfully",
  });
});

exports.createSchoolRecords = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const file = req.file;

  if (file) {
    const certificate = {
      name: file.fieldname,
      file: file.location,
    };
    req.body.certificate = certificate;
  }

  let employee = await Staff.findOne({ user: userId });

  if (!employee) {
    return next(new ErrorResponse("no employee profile found", 404));
  }

  req.body.employee = userId;

  let school = await School.create(req.body);

  res.status(201).json({
    success: true,
    message: "school record created successfully",
    data: school,
  });
});
