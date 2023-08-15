const express = require("express");

const { register, login } = require("../../controllers/auth/auth");
const { logginLimiter } = require("../../middleware/loginLimiter");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// router.route("/login").post(logginLimiter, login)

module.exports = router;