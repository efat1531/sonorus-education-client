const mongoose = require("mongoose");
const moment = require("moment-timezone");
const Course = require("./courseModel");

// Review Schema - Review Schema is used to define the structure of the document
const reviewSchema = new mongoose.Schema(
  {
    // user - User who created the review - Required - Object ID - Ref User
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
    // course - Course to which the review belongs - Required - Object ID - Ref Course
    course: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
      required: [true, "Review must belong to a course"],
    },
    // review - Review text - Required - String
    review: {
      type: String,
      required: [true, "Review cannot be empty"],
    },
    // rating - Rating of the review - Required - Number - Min 1 - Max 5
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Review must have a rating"],
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        ret.createdAt = moment(ret.createdAt)
          .tz(process.env.TZ)
          .format("MMMM Do YYYY, h:mm a");
        ret.updatedAt = moment(ret.updatedAt)
          .tz(process.env.TZ)
          .format("MMMM Do YYYY, h:mm a");
      },
    },
    timestamps: true,
  }
);

reviewSchema.index({ course: 1, user: 1 }, { unique: true });

// Populate user field
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
  });
  next();
});

// Calculate average rating for a course
reviewSchema.statics.calcAverageRatings = async function (courseId) {
  const stats = await this.aggregate([
    {
      $match: { course: courseId },
    },
    {
      $group: {
        _id: "$course",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  if (stats.length > 0) {
    await Course.findByIdAndUpdate(courseId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Course.findByIdAndUpdate(courseId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

// Calculate average rating after save
reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.course);
});

// Calculate average rating before remove
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.clone().findOne();
  next();
});

// Calculate average rating after remove
reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcAverageRatings(this.r.course);
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
