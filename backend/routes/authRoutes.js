const authController = require("../controllers/authController");
const express = require("express");
const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/forget-password").patch(authController.forgetPassword);
router.route("/reset-password/:token").patch(authController.resetPassword);

router.use(authController.protect);
router.route("/update-password").patch(authController.updatePassword);
router.route("/logout").delete(authController.logout);

module.exports = router;
