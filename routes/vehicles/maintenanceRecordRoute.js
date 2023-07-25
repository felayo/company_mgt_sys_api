const express = require("express");

const {
  createMaintenanceRecord,
  getMaintenanceRecords,
} = require("../../controllers/vehicle/maintenanceRecord");


const router = express.Router();

router.post("/:vehicleId", createMaintenanceRecord);
router.get("/", getMaintenanceRecords);

module.exports = router;