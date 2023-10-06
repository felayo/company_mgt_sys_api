const express = require("express");

const {
  createDepartment,
  getDepartments,
  assignStaffToDepartment,
  getAllStaffInDepartments
} = require("../../controllers/admin/adminDeptCtrl");


const router = express.Router();

router.post("/", createDepartment);
router.get("/", getDepartments);
router.post("/:deptId/employees/:userId", assignStaffToDepartment);
router.get("/employees", getAllStaffInDepartments);

module.exports = router;
