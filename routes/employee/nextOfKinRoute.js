const express = require("express");

const {
  createNextOfKinRecord,
} = require("../../controllers/staff/nextOfKinRecord");

const router = express.Router();

router.post("/", createNextOfKinRecord);

module.exports = router;
