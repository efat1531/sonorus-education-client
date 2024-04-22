const courseController = require("../controllers/courseController");
const authController = require("../controllers/authController");
const reviewRouter = require("./reviewRoutes");

const express = require("express");

const router = express.Router();

// This route is defined to get all the courses
// Course Route -> /api/v1/courses
router.route("/").get(courseController.getAllCourses);


// This route is defined for get top courses
// Course Route -> /api/v1/courses/top-courses
router.get("/top-courses", courseController.getTopCourses);


// This route is defined for getting the stats of the course
// Course Route -> /api/v1/courses/course-stats
// This route is only accessible by admin and instructor
router.get(
  "/course-stats",
  authController.protect,
  authController.restrictTo("admin", "instructor"),
  courseController.getsCourseStats
);

// This route is defined for get course by id
// Course Route -> /api/v1/courses/:id 
router.get("/:id", courseController.getCourseByID);


// This is a protect middleware to protect all the routes after this middleware
router.use(authController.protect);


// This route is defined for creating the course
// Course Route -> /api/v1/courses
// This route is only accessible by admin and instructor
router.post(
  "/",
  authController.restrictTo("admin", "instructor"),
  courseController.createCourse
);


// This route is defined for patching the course by id
// Course Route -> /api/v1/courses/:id
// This route is only accessible by admin and instructor
router.patch(
  "/:id",
  authController.restrictTo("admin", "instructor"),
  courseController.updateCourse
);

// This route is defined for deleting the course by id
// Course Route -> /api/v1/courses/:id
// This route is only accessible by admin
router.delete(
  "/:id",
  authController.restrictTo("admin"),
  courseController.deleteCourse
);


// This route is defined for updating the course price by id
// Course Route -> /api/v1/courses/:id/update-price
// This route is only accessible by admin and instructor
router.patch(
  "/:id/update-price",
  authController.restrictTo("admin", "instructor"),
  courseController.updateCoursePrice
);


// This route is used for review routes
// This route is using review router for update delete modify and get reviews
router.use("/:courseId/reviews", reviewRouter);

module.exports = router;
