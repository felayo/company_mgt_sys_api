const express = require("express");
const {
  createVehicleUser,
  getVehicleUsers,
} = require("../../controllers/vehicle/vehicleUser");

const router = express.Router();

router.post('/', createVehicleUser);
router.get('/', getVehicleUsers);

module.exports = router;