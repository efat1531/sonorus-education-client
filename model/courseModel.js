const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "A course must have a name"],
        unique: true,
        trim: true
    },
    duration : {
        type: Number,
        required: [true, "A course must have a duration"]
    },
    price : {
        type: Number,
        required: [true, "A course must have a price"]
    },
    discount: {
        type: Number,
        validate: {
            validator: function(val) {
                console.log(val, this.price);
                return val < this.price;
            },
          message: "Discount must be less than the price",
        },
        default: 0,
    },
      
    summary : {
        type: String,
        required: [true, "A course must have a summary"],
        trim: true,
    },
    description : {
        type: String,
        required: [true, "A course must have a description"],
        trim: true
    },
    whatYouWillLearn : {
        type: [String],
        required: [true, "A course must have what you will learn"]
    },
    requirements : {
        type: [String],
        required: [true, "A course must have requirements"]
    },
    createdAt : {
        type: Date,
        default: Date.now()
    },
    ratingsAverage : {
        type: Number,
        default: 5,
        min: [1, "Rating must be above 1.0"],
        max: [5, "Rating must be below 5.0"],
        set: val => Math.round(val * 10) / 10
    },
    introVideo : {
        type: String,
        required: [true, "A course must have an intro video"]
    },
    materials : {
        type: [String],
    },
    ratingsQuantity : {
        type: Number,
        default: 0
    },
    totalStudents : {
        type: Number,
        default: 0
    },
    slug : {
        type: String
    },
});

courseSchema.virtual("discountPrice").get(function() {
    return this.price - this.discount;
});

courseSchema.virtual("discountPercentage").get(function() {
    return (this.discount / this.price) * 100;
});

courseSchema.virtual("durationMonths").get(function() {
    return this.duration / 30;
});

courseSchema.pre('save', function(next) {
    this.slug = this.name.split(" ").join("-").toLowerCase();
    next();
});


const courseModel = mongoose.model("Course", courseSchema);

module.exports = courseModel;