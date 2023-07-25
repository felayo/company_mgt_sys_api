const MaintenanceRecord = require("../../models/vehicles/maintenanceRecord");
const VehicleRecord = require("../../models/vehicles/vehicleRecordModel");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../../utils/errorResponse");

exports.createMaintenanceRecord = asyncHandler(async (req, res, next) => {
    const vehicleID = req.params.vehicleId;

    let vehicle_record = await VehicleRecord.findById(vehicleID);

    if (!vehicle_record) {
        return next(
            new ErrorResponse("This vehicle cannot be found", 404)
        );
    }

    req.body.vehicle = vehicleID;

    let maintenance_record = await MaintenanceRecord.create(req.body);

    res.status(201).json({
        success: true,
        message: "maintenance record saved successfully",
        data: maintenance_record
    })

})

exports.getMaintenanceRecords = asyncHandler(async (req, res, next) => {
    let maintenance_records = await MaintenanceRecord.find().populate({
        path: 'vehicle',
        select: 'make registration user',
        model: 'VehicleRecord'
    })

    res.status(200).json({
        success: true,
        message: "fetched maintenance record successfully",
        data: maintenance_records
    })
})

