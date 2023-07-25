const express = require("express");

const {
  assignStaffToDepartment,
  getAllStaffInDepartments,
} = require("../../controllers/admin/adminDeptRecordCtrl");

const router = express.Router();

router.post("/:userId/:deptId", assignStaffToDepartment);

router.get("/", getAllStaffInDepartments);

module.exports = router;
