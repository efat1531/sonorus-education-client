const courseController = require("../controllers/courseController");
const authController = require("../controllers/authController");
const reviewRouter = require("./reviewRoutes");

const express = require("express");

const router = express.Router();

router.route("/").get(courseController.getAllCourses);

router.get("/top-courses", courseController.getTopCourses);

router.get(
  "/course-stats",
  authController.protect,
  authController.restrictTo("admin", "instructor"),
  courseController.getsCourseStats
);

router.get("/:id", courseController.getCourseByID);

router.use(authController.protect);

router.post(
  "/",
  authController.restrictTo("admin", "instructor"),
  courseController.createCourse
);

router.patch(
  "/:id",
  authController.restrictTo("admin", "instructor"),
  courseController.updateCourse
);
router.delete(
  "/:id",
  authController.restrictTo("admin"),
  courseController.deleteCourse
);

router.patch(
  "/:id/update-price",
  authController.restrictTo("admin", "instructor"),
  courseController.updateCoursePrice
);

router.use("/:courseId/reviews", reviewRouter);

module.exports = router;
