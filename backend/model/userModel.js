const mongoose = require("mongoose");
const bycryptjs = require("bcryptjs");
const validator = require("validator");
const moment = require("moment-timezone");


// User Schema - User Schema is used to define the structure of the document
const userSchema = new mongoose.Schema(
  {
    // firstName - First name of the user - Required - String - Min length 2 - Max length 128
    firstName: {
      type: String,
      required: [true, "Please provide your first name"],
      minlength: 2,
      maxlength: 128,
      trim: true,
    },
    // lastName - Last name of the user - String - Min length 2 - Max length 64
    lastName: {
      type: String,
      minlength: 2,
      maxlength: 32,
      trim: true,
    },

    // email - Email of the user - Required - Unique - Lowercase - String - Valid Email
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },

    // password - Password of the user - Required - String - Min length 8 - Max length 32 - Select false
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      maxlength: 32,
      select: false,
      validate: [
        {
          validator: function (val) {
            return val.match(/\d+/g) && val.match(/[a-zA-Z]+/g);
          },
          message: "Password must contain at least one letter and one number",
        },
        {
          validator: function (val) {
            return !val.match(/\s/);
          },
          message: "Password must not contain any spaces",
        },
        {
          validator: function (val) {
            return val.match(/[@#$%&*]/);
          },
          message: "Password must contain at least one special character",
        },
        {
          validator: function (val) {
            return !val.match(/[^a-zA-Z0-9@#$%&*]/);
          },
          message:
            "Password must contain only letters, numbers, and special characters ie '@' '$' '#' '%' '&' '*'",
        },
      ],
    },
    // passwordConfirm - Confirm password of the user - Required - String - Validate - Must be same as password
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Passwords do not match",
      },
    },
    // role - Role of the user - Default student - Enum - User, Admin, Instructor, Student
    role: {
      type: String,
      enum: ["user", "admin", "instructor", "student"],
      default: "student",
    },
    // photo - Photo of the user - String - Default default.jpg
    photo: {
      type: String,
      default: "default.jpg",
    },
    // passwordChangedAt - Password changed at - Date
    passwordChangedAt: Date,
    // passwordResetToken - Password reset token - String
    passwordResetToken: String,
    // passwordResetExpires - Password reset expires - Date
    passwordResetExpires: Date,
    // active - Active - Boolean - Default true
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        ret.passwordChangedAt = moment(ret.passwordChangedAt)
          .tz(process.env.TZ)
          .format("hh:mm:ss A, MMMM DD,YYYY");
        ret.createdAt = moment(ret.createdAt)
          .tz(process.env.TZ)
          .format("hh:mm A, MMMM DD,YYYY");
        ret.updatedAt = moment(ret.updatedAt)
          .tz(process.env.TZ)
          .format("hh:mm A, MMMM DD,YYYY");
        return ret;
      },
    },
  }
);

// Pre save middleware to hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bycryptjs.genSalt(12);
  this.password = await bycryptjs.hash(this.password, salt);
  this.passwordConfirm = undefined;
  next();
});


// Pre save middleware to set the passwordChangedAt
userSchema.pre("save", function (next) {
  if (!this.isModified("password") && !this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Pre find middleware to filter the active users
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// Instance method to check the password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bycryptjs.compare(candidatePassword, userPassword);
};

// Instance method to check the password changed after
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(
      this.passwordChangedAt.getTime() / 1000
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Instance method to create the password reset token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = require("crypto").randomBytes(32).toString("hex");
  this.passwordResetToken = require("crypto")
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

// Instance method to get the full name
userSchema.methods.fullName = function () {
  return this.firstName + (this.lastName ? " " + this.lastName : "");
};

// User Model - User Model is used to create the document
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
