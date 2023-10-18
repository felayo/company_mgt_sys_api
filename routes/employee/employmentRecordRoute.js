const express = require("express");

const {
  createEmploymentRecord,
} = require("../../controllers/staff/employmentRecord");

const router = express.Router();

router.post("/", createEmploymentRecord);

module.exports = router;
