const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const express = require("express");
const router = express.Router();

// This route is defined get user by id
// User Route -> /api/v1/users/get-user/:id
router.route("/get-user/:id").get(userController.getUserByID);

// This is a protect middleware to protect all the routes after this middleware
// This middleware will check if the user is logged in or not
router.use(authController.protect);

// This route is defined for getting all the users
// User Route -> /api/v1/users/get-users
// This route is only accessible by admin
router
  .route("/get-users")
  .get(authController.restrictTo("admin"), userController.getAllUsers);


// This route is defined for updating the user
// User Route -> /api/v1/users/update-user
router.route("/update-user").patch(userController.updateUser);


// This route is defined for deleting the user
// User Route -> /api/v1/users/delete-user
router.route("/delete-user").delete(userController.deleteUser);

// This route is defined for getting the user information
// User Route -> /api/v1/users/me
router.route("/me").get(userController.getMe);

module.exports = router;
