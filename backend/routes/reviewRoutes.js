const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const express = require("express");
const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/")
  .get(authController.restrictTo("admin"), reviewController.getAllReviews)
  .post(reviewController.createReview);

router
  .route("/:id")
  .get(reviewController.getReviewByID)
  .patch(reviewController.patchReview)
  .delete(reviewController.deleteReview);

module.exports = router;
