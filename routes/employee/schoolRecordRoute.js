const express = require("express");

const { createSchoolRecords, getSchoolRecords } = require("../../controllers/staff/schoolRecord");
const { upload } = require("../../middleware/multer");

const router = express.Router();

router.post("/", upload.single("certificate"), createSchoolRecords)
router.get("/", getSchoolRecords)

module.exports = router;