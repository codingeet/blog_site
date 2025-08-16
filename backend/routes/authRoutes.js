const express = require("express");
const { register, login, refreshToken, getLoggedInUser } = require("../controllers/authController.js");
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.get("/getLoggedInUser", getLoggedInUser);

module.exports = router;
