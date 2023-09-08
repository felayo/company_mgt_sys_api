const express = require("express");

const { register, login, refresh, logout } = require("../../controllers/auth/auth");
const { logginLimiter } = require("../../middleware/loginLimiter");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/refresh", refresh);
router.post("/logout", logout);
// router.route("/login").post(logginLimiter, login)

module.exports = router;