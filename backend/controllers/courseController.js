const courseModel = require("../model/courseModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// This function retrieves all courses from the database using the courseModel's find method.
// It then sends a JSON response with a status of 200, the number of courses found, and the course data.
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

// This function retrieves a course by its ID from the database, populates it with associated reviews, and sends it in the response. If no course is found, it triggers an error handler with a 404 status.
exports.getCourseByID = catchAsync(async (req, res, next) => {
  const course = await courseModel.findById(req.params.id).populate("reviews");
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

// This function creates a new course using the provided request body and returns the created course data with a 201 status code.
exports.createCourse = catchAsync(async (req, res, next) => {
  const newCourse = await courseModel.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      course: newCourse,
    },
  });
});

// This function updates a course by its ID using the provided request body. If the request body contains a price or discount, it triggers an error handler with a 400 status code. If no course is found with the provided ID, it triggers an error handler with a 404 status code.
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

// This function updates a course's price or discount by its ID using the provided request body. If no course is found with the provided ID, it triggers an error handler with a 404 status code. If the request body does not contain a price or discount, it triggers an error handler with a 400 status code. If the price or discount is negative, it triggers an error handler with a 400 status code.
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

// This function deletes a course by its ID. If no course is found with the provided ID, it triggers an error handler with a 404 status code. If the course is successfully deleted, it sends a 204 status code with no data.
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

// This function retrieves the top 5 courses based on their average ratings and sends them in the response.
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

// This function retrieves course statistics such as the number of courses, average rating, average price, minimum price, maximum price, and total number of students. It then sends the statistics in the response.
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
