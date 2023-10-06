const express = require("express");

const {
  createNextOfKinRecord,
  getNextOfKinRecord ,
} = require("../../controllers/staff/nextOfKinRecord");


const router = express.Router();

router.post("/", createNextOfKinRecord);
router.get("/", getNextOfKinRecord );

module.exports = router;
