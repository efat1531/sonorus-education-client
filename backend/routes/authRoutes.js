const authController = require("../controllers/authController");
const express = require("express");
const router = express.Router();

// Signup route to create a new user
// Auth Route -> /api/v1/auth/signup
router.route("/signup").post(authController.signup);

// Login route to login the user
// Auth Route -> /api/v1/auth/login
router.route("/login").post(authController.login);

// Forget password route to forget the password
// Auth Route -> /api/v1/auth/forget-password
router.route("/forget-password").patch(authController.forgetPassword);

// Reset password route to reset the password
// Auth Route -> /api/v1/auth/reset-password/:token
router.route("/reset-password/:token").patch(authController.resetPassword);

// Protect all routes after this middleware
// This middleware will check if the user is logged in or not
router.use(authController.protect);

// Update user password route to update the password
// Auth Route -> /api/v1/auth/update-password
router.route("/update-password").patch(authController.updatePassword);

// Logout from the application 
// Auth Route -> /api/v1/auth/logout
router.route("/logout").delete(authController.logout);

module.exports = router;
