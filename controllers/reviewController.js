const reviewModel = require("../model/reviewModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

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
