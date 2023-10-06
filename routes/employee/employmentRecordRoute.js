const express = require("express");

const {
  createEmploymentRecord,
  getEmploymentRecord,
} = require("../../controllers/staff/employmentRecord");


const router = express.Router();

router.post("/", createEmploymentRecord);
router.get("/", getEmploymentRecord);

module.exports = router;
