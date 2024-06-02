const courseRegModel = require("../models/courseRegModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const courseModel = require("../models/courseModel");

// Get all course registrations
const getAllCourseRegs = catchAsync(async (req, res, next) => {
  const courseRegs = await courseRegModel.find();
  res.status(200).json({
    status: "success",
    results: courseRegs.length,
    data: {
      courseRegs,
    },
  });
});

// Get course registration by ID
const getCourseReg = catchAsync(async (req, res, next) => {
  const courseReg = await courseRegModel.findById(req.params.id);
  if (!courseReg) {
    return next(new AppError("No course registration found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      courseReg,
    },
  });
});

// Create course registration
const createCourseReg = catchAsync(async (req, res, next) => {
  const userID = req.user.id;
  const courseID = req.params.courseID;
  const courseReg = await courseRegModel.create({
    course: courseID,
    student: userID,
  });
  res.status(201).json({
    status: "success",
    data: {
      courseReg,
    },
  });
  const course = await courseModel.findById(courseID);
  course.addStudent();
});
