const express = require("express");

const {
  createCertificationRecord,
} = require("../../controllers/staff/certificationRecord");

const { upload } = require("../../middleware/multer");

const router = express.Router();

router.post("/", upload.single("certificate"), createCertificationRecord);

module.exports = router;
