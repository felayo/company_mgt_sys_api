const express = require("express");
const router = express.Router();

const { protect } = require("../../middleware/auth");

// import routes
const employeeProfileRoute = require("./employeeProfileRoute");
const schoolRecordRoute = require("./schoolRecordRoute");
const certificationRecordRoute = require("./certificationRecordRoute");
const employmentRecordRoute = require("./employmentRecordRoute");
const guarantorRecordRoute = require("./guarantorRecordRoute");
const nextOfKinRoute = require("./nextOfKinRoute");


// use routes
router.use("/profile", protect, employeeProfileRoute); 
router.use("/schools", protect, schoolRecordRoute);
router.use("/certifications", protect, certificationRecordRoute)
router.use("/employments", protect, employmentRecordRoute)
router.use("/guarantors", protect, guarantorRecordRoute)
router.use("/next_of_kin", protect, nextOfKinRoute);

// export default router
module.exports = router;
