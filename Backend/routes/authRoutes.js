const express = require("express");
const { body, validationResult } = require("express-validator");
const {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// REGISTER
router.post(
  "/register",

  [
    body("name")
      .notEmpty()
      .withMessage("Name is required"),

    body("email")
      .isEmail()
      .withMessage("Valid email required"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],

  registerUser
);

// LOGIN
router.post("/login", loginUser);

// PROFILE
router.get("/profile", authMiddleware, getProfile);

// LOGOUT
router.post("/logout", logoutUser);

module.exports = router;