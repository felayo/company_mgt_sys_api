const VehicleUser = require('../../models/vehicles/vehicleUsersModel');
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../../utils/errorResponse");

exports.createVehicleUser = asyncHandler(async (req, res, next) => {
    let vehicle_user = await VehicleUser.create(req.body);

    res.status(201).json({
        success: true,
        message: "vehicle user saved successfully",
        data: vehicle_user
    })
})

exports.getVehicleUsers = asyncHandler(async (req, res, next) => {
    let vehicle_user = await VehicleUser.find();

    res.status(200).json({
        success: true,
        message: "fetched vehicle users successfully",
        data: vehicle_user
    })
})
