const express = require("express");

const {
  createCertificationRecord,
  getCertificationRecord,
} = require("../../controllers/staff/certificationRecord");

const { upload } = require("../../middleware/multer");

const router = express.Router();

router.post("/", upload.single("certificate"), createCertificationRecord);
router.get("/", getCertificationRecord);

module.exports = router;
