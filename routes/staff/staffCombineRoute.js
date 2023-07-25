const express = require("express");
const router = express.Router();

const { protect } = require("../../middleware/auth");

// import routes
const staffProfileRoute = require("./staffProfileRoute");

// use routes
router.use("/profile", protect, staffProfileRoute); // staff Authentication routes

// export default router
module.exports = router;
