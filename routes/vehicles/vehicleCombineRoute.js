const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../../middleware/auth");

// import routes
const vehicleUserRoute = require("./vehicleUserRoute");
const vehicleRecordRoute = require("./vehicleRecordRoute");
const MaintenanceRecordRoute = require("./maintenanceRecordRoute");

// use routes
router.use(protect);
router.use(authorize("admin", "hr"));

router.use("/users", vehicleUserRoute);
router.use('/records', vehicleRecordRoute);
router.use('/maintenance', MaintenanceRecordRoute);

module.exports = router;
