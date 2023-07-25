const mongoose = require("mongoose");

const VehicleRecordSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
    },
    registration: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Good", "Okay", "Not Good", "In the workshop"],
      default: "Good",
    },
    remarks: String,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "VehicleUser",
      required: true,
    },
    dateAssign: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const VehicleRecord = mongoose.model("VehicleRecord", VehicleRecordSchema);

module.exports = VehicleRecord;
