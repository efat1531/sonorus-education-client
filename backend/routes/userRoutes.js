const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const express = require("express");
const router = express.Router();

router.route("/get-user/:id").get(userController.getUserByID);

router.use(authController.protect);
router
  .route("/get-users")
  .get(authController.restrictTo("admin"), userController.getAllUsers);

router.route("/update-user").patch(userController.updateUser);

router.route("/delete-user").delete(userController.deleteUser);

router.route("/me").get(userController.getMe);

module.exports = router;
