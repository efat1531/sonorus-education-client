const courseModel = require("../model/courseModel");

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await courseModel.find();
    res.status(200).json({
      status: "success",
      results: courses.length,
      data: {
        courses,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.getCourseByID = async (req, res) => {
  try {
    const course = await courseModel.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        course,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createCourse = async (req, res) => {
  console.log(req.body);
  try {
    const newCourse = await courseModel.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        course: newCourse,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
}


exports.updateCourse = async (req, res) => {
  try {
    const course = await courseModel.findByIdAndUpdate(req.params.id, req.body ,{
      new: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        course,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}

exports.deleteCourse = async (req, res) => {
  try {
    await courseModel.findByIdAndDelete(req.body.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  }
  catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}