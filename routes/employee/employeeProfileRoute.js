const express = require("express");

const {
  getStaffProfile,
  createStaffProfile,
  updateStaffProfile,
  deleteStaffProfile,
  uploadDocument,
  removeStaffDoc
} = require("../../controllers/staff/staffProfile");

const { upload } = require("../../middleware/multer");

const router = express.Router();

router.get("/", getStaffProfile);

// router.post("/", upload.single("avatar"), createStaffProfile)

const cpUpload = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "documents" },
]);

router.post("/", cpUpload, createStaffProfile);

router.put("/", upload.single("avatar"), updateStaffProfile);

router.put("/upload", upload.any(), uploadDocument);

router.put("/documents/:id", removeStaffDoc);

router.delete("/", deleteStaffProfile); // delete profile on dashboard

module.exports = router;
