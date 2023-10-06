const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../../middleware/auth");

// import routes
const adminEmployeeRoute = require("./adminEmployeeRoute.js");
const adminDeptRoute = require("./adminDeptRoute");


// use routes
router.use(protect);
router.use(authorize("admin", "manager"));

router.use("/employees", adminEmployeeRoute); // admin staff routes
router.use("/departments", adminDeptRoute);

// export default router
module.exports = router;
