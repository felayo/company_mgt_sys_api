const express = require("express");

const {
  createGuarantorRecord,
} = require("../../controllers/staff/guarantorRecord");

const router = express.Router();

router.post("/", createGuarantorRecord);

module.exports = router;
