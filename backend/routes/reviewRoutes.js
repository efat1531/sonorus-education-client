const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const express = require("express");
const router = express.Router({ mergeParams: true });

// This is a protect middleware to protect all the routes after this middleware
router.use(authController.protect);

// This route is defined for getting all the reviews
// Review Route -> /api/v1/reviews
// This route is only accessible by admin to update reviews
router
  .route("/")
  .get(authController.restrictTo("admin"), reviewController.getAllReviews)
  .post(reviewController.createReview);

// This route is defined for getting the review by id
// Review Route -> /api/v1/reviews/:id
router
  .route("/:id")
  .get(reviewController.getReviewByID)
  .patch(reviewController.patchReview)
  .delete(reviewController.deleteReview);

module.exports = router;
