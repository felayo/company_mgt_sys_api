const express = require("express");

const {
  adminGetAllStaff,
  adminGetOneStaff,
  adminCreateStaffProfile,
  adminUpdateStaff,
  adminDeleteStaff,
  createSchoolRecords,
} = require("../../controllers/admin/adminStaffCtrl");

const router = express.Router();

router.get("/", adminGetAllStaff);
router.get("/:userId", adminGetOneStaff);
router.post("/:userId", adminCreateStaffProfile);
router.put("/:userId", adminUpdateStaff);
router.delete("/:userId", adminDeleteStaff);
router.post("/:userId/schools", createSchoolRecords);

module.exports = router;
