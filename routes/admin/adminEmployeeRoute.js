const express = require("express");

const {
  adminGetAllStaff,
  adminGetOneStaff,
  adminCreateStaffProfile,
  adminUpdateStaff,
  adminDeleteStaff,
} = require("../../controllers/admin/adminStaffCtrl");

const {
  createSchoolRecords,
  getEmployeeSchoolRecords
} = require("../../controllers/admin/adminSchoolRecord");


const router = express.Router();

router.get("/", adminGetAllStaff);
router.get("/:userId", adminGetOneStaff);
router.post("/:userId", adminCreateStaffProfile);
router.put("/:userId", adminUpdateStaff);
router.delete("/:userId", adminDeleteStaff);
router.post("/:userId/schools", createSchoolRecords);
router.get("/:userId/schools", getEmployeeSchoolRecords)



module.exports = router;
