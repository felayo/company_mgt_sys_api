const express = require("express");

const {
  adminGetAllStaff,
  adminGetOneStaff,
  adminCreateStaffProfile,
  adminUpdateStaff,
  adminDeleteStaff,
  createSchoolRecords,
  uploadDocument,
  removeStaffDoc
} = require("../../controllers/admin/adminStaffCtrl");

const { upload } = require("../../middleware/multer");

const router = express.Router();

router.get("/", adminGetAllStaff);
router.get("/:userId", adminGetOneStaff);
router.post("/:userId", upload.single("avatar"), adminCreateStaffProfile);
router.patch("/:userId", upload.single("avatar"), adminUpdateStaff);
router.patch("/:userId/upload", upload.any(), uploadDocument);
router.put("/:userId/:documentId", removeStaffDoc);
router.delete("/:userId", adminDeleteStaff);
router.post("/:userId/schools", createSchoolRecords);

module.exports = router;
