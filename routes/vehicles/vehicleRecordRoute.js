const express = require("express");

const {
  createVehicleRecord,
  getVehicleRecords,
} = require("../../controllers/vehicle/vehicleRecord");


const router = express.Router();

router.post("/:userId", createVehicleRecord);
router.get("/", getVehicleRecords);

module.exports = router;