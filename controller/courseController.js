const courseModel = require("../model/courseModel");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");

exports.getAllCourses = catchAsync(async (req, res) => {
    const courses = await courseModel.find();
    res.status(200).json({
      status: "success",
      results: courses.length,
      data: {
        courses,
      },
    });
  } 
);
exports.getCourseByID = catchAsync(async (req, res, next) => {
      const course = await courseModel.findById(req.params.id);
      if(!course) {
        return next(new appError("No course found with that ID", 404));
      }
      res.status(200).json({
        status: "success",
        data: {
          course,
        },
      });
}
);

exports.createCourse = catchAsync(async (req, res,next) => {
    const newCourse = await courseModel.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        course: newCourse,
      },
    });
  
});


exports.updateCourse =catchAsync( async (req, res,next) => {
  
    const course = await courseModel.findByIdAndUpdate(req.params.id, req.body ,{
      new: true,
      runValidators: true,
    });
    if(!course) {
      return next(new appError("No course found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        course,
      },
    });
}
);

exports.deleteCourse = catchAsync(async (req, res,next) => {

    const course = await courseModel.findByIdAndDelete(req.params.id);
    if(!course) {
      return next(new appError("No course found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
});

exports.getTopCourses =catchAsync( async (req, res,next) => {
  
    const courses = await courseModel.find().sort({ratingsAverage: -1}).limit(5);
    res.status(200).json({
      status: "success",
      data: {
        courses,
      },
    });

});

exports.getsCourseStats = catchAsync(async (req, res,next) => {
    const stats = await courseModel.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.0 } },
      },
      {
        $group: {
          _id:null,
          numCourses: { $sum: 1 },
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
          students: { $sum: "$totalStudents"},
        },
      },
      {
        $project: {
          _id: 0,
        },
      }
    ]);
    res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });
});
