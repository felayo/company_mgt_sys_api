const express = require("express");

const {
  createGuarantorRecord,
  getGuarantorRecord,
} = require("../../controllers/staff/guarantorRecord");


const router = express.Router();

router.post("/", createGuarantorRecord);
router.get("/", getGuarantorRecord);

module.exports = router;
