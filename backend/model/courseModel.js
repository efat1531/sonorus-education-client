const mongoose = require("mongoose");
const moment = require("moment-timezone");

// Course Schema - Course Schema is used to define the structure of the document
const courseSchema = new mongoose.Schema(
  {
    // name - Name of the course - Required - String - Unique - Trim
    name: {
      type: String,
      required: [true, "A course must have a name"],
      unique: true,
      trim: true,
    },
    // duration - Duration of the course - Required - Number
    duration: {
      type: Number,
      required: [true, "A course must have a duration"],
    },
    // price - Price of the course - Required - Number - Price must be greater than 0
    price: {
      type: Number,
      required: [true, "A course must have a price"],
      validate: {
        validator: function (val) {
          return val > 0;
        },
        message: "Price must be greater than 0",
      },
    },
    // discount - Discount on the course - Number - Default 0 - Discount must be a positive number - Discount must be less than the price
    discount: {
      type: Number,
      default: 0,
      validate: {
        validator: function (val) {
          return val >= 0;
        },
        message: "Discount must be a positive number",
        validator: function (val) {
          return val < this.price;
        },
        message: "Discount must be less than the price",
      },
    },
    // summary - Summary of the course - Required - String - Trim
    summary: {
      type: String,
      required: [true, "A course must have a summary"],
      trim: true,
    },
    // description - Description of the course - Required - String - Trim
    description: {
      type: String,
      required: [true, "A course must have a description"],
      trim: true,
    },

    // whatYouWillLearn - What you will learn in the course - Required - Array of Strings
    whatYouWillLearn: {
      type: [String],
      required: [true, "A course must have what you will learn"],
    },

    // requirements - Requirements of the course - Required - Array of Strings
    requirements: {
      type: [String],
      required: [true, "A course must have requirements"],
    },

    // createdAt - Created at - Date - Default Date.now()
    createdAt: {
      type: Date,
      default: Date.now(),
    },

    // ratingsAverage - Average rating of the course - Number - Default 5 - Min 1 - Max 5 - Set to 1 decimal place
    ratingsAverage: {
      type: Number,
      default: 5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    // introVideo - Intro video of the course - Required - String
    introVideo: {
      type: String,
      required: [true, "A course must have an intro video"],
    },

    // materials - Materials of the course - Array of Strings
    materials: {
      type: [String],
    },

    // ratingsQuantity - Number of ratings of the course - Number - Default 0
    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    // totalStudents - Total students enrolled in the course - Number - Default 0
    totalStudents: {
      type: Number,
      default: 0,
    },

    // slug - Slug of the course - String
    slug: {
      type: String,
    },

    // instructor - Instructor of the course - Required - Object ID - Ref User
    instructor: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A course must have an instructor"],
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        //delete ret.id
        ret.createdAt = moment(ret.createdAt)
          .tz(process.env.TZ)
          .format("hh:mm A, MMMM DD,YYYY");
        ret.updatedAt = moment(ret.updatedAt)
          .tz(process.env.TZ)
          .format("hh:mm A, MMMM DD,YYYY");
        return ret;
      },
    },
    toObject: { virtuals: true },
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

courseSchema.virtual("discountPrice").get(function () {
  return this.price - this.discount;
});

courseSchema.virtual("discountPercentage").get(function () {
  return (this.discount / this.price) * 100;
});

courseSchema.virtual("durationMonths").get(function () {
  return this.duration / 30;
});

courseSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "course",
  localField: "_id",
});

courseSchema.pre("save", function (next) {
  this.slug = this.name.split(" ").join("-").toLowerCase();
  next();
});

courseSchema.methods.addStudent = function () {
  this.totalStudents++;
  return this.save();
};

const courseModel = mongoose.model("Course", courseSchema);

module.exports = courseModel;
