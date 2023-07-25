const mongoose = require("mongoose");

const MaintenanceRecordSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    vehicle: {
      type: mongoose.Schema.ObjectId,
      ref: "VehicleRecord",
    },
    details: String,
    amount: {
      type: Number,
      required: true,
    },
    contractor: String,
    remarks: String,
  },
  { timestamps: true }
);

let MaintenanceRecord = mongoose.model(
  "MaintenanceRecord",
  MaintenanceRecordSchema
);

module.exports = MaintenanceRecord;