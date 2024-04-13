const mongoose = require("mongoose");
const moment = require("moment-timezone");
const Course = require("./courseModel");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
    course: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
      required: [true, "Review must belong to a course"],
    },
    review: {
      type: String,
      required: [true, "Review cannot be empty"],
    },
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

// Populate user
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
  });
  next();
});

// Calculate average rating
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
