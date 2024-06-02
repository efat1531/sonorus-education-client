const mongoose = require("mongoose");

// Course Registration Schema - Course Registration Schema is used to define the structure of the document
const courseRegSchema = new mongoose.Schema({
  // course - Course ID - Required - Object ID
  course: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
    required: [true, "A course registration must have a course"],
  },
  // student - Student ID - Required - Object ID
  student: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  // createdAt - Date and Time of the course registration - Required - Date
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed", "Refunded"],
    default: "Pending",
  },
});

// Course Registration Model - Course Registration Model is used to create an instance of the document
const CourseReg = mongoose.model("CourseReg", courseRegSchema);

// Populating the course and student fields
courseRegSchema.pre(/^find/, function (next) {
  this.populate({
    path: "course",
    select: "name price",
  }).populate({
    path: "student",
    select: "name email",
  });
  next();
});

// Get all registrations of a single course

module.exports = CourseReg;
