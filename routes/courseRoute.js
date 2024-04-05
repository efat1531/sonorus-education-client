const courseController = require("../controllers/courseController");
const authController = require("../controllers/authController");

const express = require("express");

const router = express.Router();

router
  .route("/")
  .get(courseController.getAllCourses)
  .post(
    authController.protect,
    authController.restrictTo("admin", "instructor"),
    courseController.createCourse
  );

router.route("/top-courses").get(courseController.getTopCourses);
router
  .route("/course-stats")
  .get(
    authController.protect,
    authController.restrictTo("admin", "instructor"),
    courseController.getsCourseStats
  );
router
  .route("/:id")
  .get(courseController.getCourseByID)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "instructor"),
    courseController.updateCourse
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    courseController.deleteCourse
  );

router
  .route("/:id/update-price")
  .patch(
    authController.protect,
    authController.restrictTo("admin", "instructor"),
    courseController.updateCoursePrice
  );

module.exports = router;
