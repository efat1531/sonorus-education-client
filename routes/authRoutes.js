const authController = require("../controllers/authController");
const express = require("express");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.patch("/forget-password", authController.forgetPassword);
router.patch("/reset-password/:token", authController.resetPassword);
router.patch(
  "/update-password",
  authController.protect,
  authController.updatePassword
);

module.exports = router;
