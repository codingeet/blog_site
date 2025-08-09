const express = require("express");
const { register, login, refreshToken } = require("../controllers/authController.js");
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/refresh", refreshToken);

module.exports = router;
