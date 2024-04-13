const courseController = require("../controllers/courseController");
const authController = require("../controllers/authController");
const reviewRouter = require("./reviewRoutes");

const express = require("express");

const router = express.Router();

router.route("/").get(courseController.getAllCourses);

router.route("/top-courses").get(courseController.getTopCourses);
router.route("/:id").get(courseController.getCourseByID);

router.use(authController.protect);

router
  .route("/")
  .post(
    authController.restrictTo("admin", "instructor"),
    courseController.createCourse
  );
router
  .route("/course-stats")
  .get(
    authController.restrictTo("admin", "instructor"),
    courseController.getsCourseStats
  );

router
  .route("/:id")
  .patch(
    authController.restrictTo("admin", "instructor"),
    courseController.updateCourse
  )
  .delete(authController.restrictTo("admin"), courseController.deleteCourse);

router
  .route("/:id/update-price")
  .patch(
    authController.restrictTo("admin", "instructor"),
    courseController.updateCoursePrice
  );

router.use("/:courseId/reviews", reviewRouter);

module.exports = router;
