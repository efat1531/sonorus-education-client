const courseModel = require("../model/courseModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllCourses = catchAsync(async (req, res, next) => {
  const courses = await courseModel.find();
  res.status(200).json({
    status: "success",
    results: courses.length,
    data: {
      courses,
    },
  });
});
exports.getCourseByID = catchAsync(async (req, res, next) => {
  const course = await courseModel.findById(req.params.id);
  if (!course) {
    return next(new AppError("No course found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      course,
    },
  });
});

exports.createCourse = catchAsync(async (req, res, next) => {
  const newCourse = await courseModel.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      course: newCourse,
    },
  });
});

exports.updateCourse = catchAsync(async (req, res, next) => {
  if (req.body.price || req.body.discount) {
    return next(
      new AppError(
        `Use /${req.params.id}/update-price route to update price or discount`,
        400
      )
    );
  }
  const course = await courseModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!course) {
    return next(new AppError("No course found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      course,
    },
  });
});

exports.updateCoursePrice = catchAsync(async (req, res, next) => {
  const course = await courseModel.findById(req.params.id);
  if (!course) {
    return next(new AppError("No course found with that ID", 404));
  }
  if (!req.body.price && !req.body.discount) {
    return next(new AppError("Price or discount is required", 400));
  }
  if (req.body.price < 0 || req.body.discount < 0) {
    return next(new AppError("Price or discount cannot be negative", 400));
  }
  course.price = req.body.price || course.price;
  course.discount = req.body.discount || course.discount;
  await course.save();
  res.status(200).json({
    status: "success",
    data: {
      course,
    },
  });
});

exports.deleteCourse = catchAsync(async (req, res, next) => {
  const course = await courseModel.findByIdAndDelete(req.params.id);
  if (!course) {
    return next(new AppError("No course found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getTopCourses = catchAsync(async (req, res, next) => {
  const courses = await courseModel
    .find()
    .sort({ ratingsAverage: -1 })
    .limit(5);
  res.status(200).json({
    status: "success",
    data: {
      courses,
    },
  });
});

exports.getsCourseStats = catchAsync(async (req, res, next) => {
  const stats = await courseModel.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.0 } },
    },
    {
      $group: {
        _id: null,
        numCourses: { $sum: 1 },
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
        students: { $sum: "$totalStudents" },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});
