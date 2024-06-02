const courseRegController = require("../controllers/courseRegController");
const authController = require("../controllers/authController");

const router = require("express").Router();

// This route is protected. The user must be logged in to access any routes after this middleware.
router.use(authController.protect);

// This route is defined to get all the course registrations
router
  .route("/")
  .get(
    authController.restrictTo("admin", "instructor"),
    courseRegController.getAllCourseRegs
  );

// This route is defined for get course registration by id
router.route("/:id").get(courseRegController.getCourseReg);

// This route is defined for creating the course registration
router.route("/:courseID").post(courseRegController.createCourseReg);

// This route is defined for get all registration of a course
router
  .route("/course/:courseID")
  .get(
    authController.restrictTo("admin", "instructor"),
    courseRegController.getAllCourseRegsOfCourse
  );

module.exports = router;
