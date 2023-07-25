const VehicleRecord = require("../../models/vehicles/vehicleRecordModel");
const VehicleUser = require("../../models/vehicles/vehicleUsersModel");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../../utils/errorResponse");

exports.createVehicleRecord = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;

  // check for user in the vehicle user's table
  let vehicle_users = await VehicleUser.findOne({ _id: userId });
  if (!vehicle_users) {
    return next(
      new ErrorResponse("This user is not found in the vehicle users", 404)
    );
  }
  
  // check whether the vehicle has already been created
  let registrationNumber = req.body.registration;
  let vehicle_record = await VehicleRecord.findOne({ registration: registrationNumber });

  if (vehicle_record) {
    return next(
      new ErrorResponse("The registration number already exist", 422)
    );
  }

  req.body.user = userId;

  vehicle_record = await VehicleRecord.create(req.body);

  res.status(201).json({
    success: true,
    message: "vehicle create successfully",
    data: vehicle_record,
  });
});

exports.getVehicleRecords = asyncHandler(async (req, res, next) => {
  let vehicle_records = await VehicleRecord.find().populate({
    path: "user",
    model: "VehicleUser",
  });

  res.status(200).json({
    success: true,
    message: "fetched vehicle records successfully",
    data: vehicle_records,
  });
});
