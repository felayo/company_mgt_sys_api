const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../../middleware/auth");

// import routes
const adminStaffRoute = require("./adminStaffRoute.js");
const adminDeptRecordRoute = require("./adminDeptRecordRoute");
const adminDeptRoute = require("./adminDeptRoute");

// use routes
router.use(protect);
router.use(authorize("admin"));

router.use("/staffs", adminStaffRoute); // admin staff routes
router.use("/departments/staff", adminDeptRecordRoute);
router.use("/departments", adminDeptRoute);

// export default router
module.exports = router;
