const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const express = require("express");
const router = express.Router();

router
  .route("/get-users")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getAllUsers
  );
router.route("/get-user/:id").get(userController.getUserByID);
router
  .route("/update-user")
  .patch(authController.protect, userController.updateUser);

router
  .route("/delete-user")
  .delete(authController.protect, userController.deleteUser);

module.exports = router;
