const reviewModel = require("../model/reviewModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// This function retrieves all reviews from the database using the reviewModel's find method.
exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await reviewModel.find();
  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});


// This function retrieves a review by its ID from the database and sends it in the response. If no review is found, it triggers an error handler with a 404 status.
exports.getReviewByID = catchAsync(async (req, res, next) => {
  const review = await reviewModel.findById(req.params.id);
  if (!review) {
    return next(new appError("No review found with that ID", 404));
  }

  // Check the user has posted that review or not
  if (review.user.id !== req.user.id || req.user.role !== "admin") {
    return next(
      new appError("You are not authorized to perform this action", 401)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});


// This function creates a new review using the provided request body and returns the created review data with a 201 status code.
exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await reviewModel.create({
    ...req.body,
    user: req.user.id,
    course: req.params.courseId,
  });
  res.status(201).json({
    status: "success",
    data: {
      review: newReview,
    },
  });
});

// This function updates a review by its ID using the provided request body. If no review is found with the provided ID, it triggers an error handler with a 404 status code. If the user is not the author of the review, it triggers an error handler with a 401 status code.
exports.patchReview = catchAsync(async (req, res, next) => {
  const review = await reviewModel.findById(req.params.id);
  if (!review) {
    return next(new appError("No review found with that ID", 404));
  }

  // Check the user has posted that review or not
  if (review.user.id !== req.user.id) {
    return next(
      new appError("You are not authorized to perform this action", 401)
    );
  }

  const updatedReview = await reviewModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success",
    data: {
      review: updatedReview,
    },
  });
});

// This function deletes a review by its ID. If no review is found with the provided ID, it triggers an error handler with a 404 status code. If the user is not the author of the review, it triggers an error handler with a 401 status code.
exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await reviewModel.findById(req.params.id);
  if (!review) {
    return next(new appError("No review found with that ID", 404));
  }
  // Check the user has posted that review or not
  if (review.user.id !== req.user.id || req.user.role !== "admin") {
    return next(
      new appError("You are not authorized to perform this action", 401)
    );
  }
  await reviewModel.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
