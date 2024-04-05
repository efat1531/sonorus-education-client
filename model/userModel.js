const mongoose = require("mongoose");
const bycryptjs = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide your first name"],
      minlength: 2,
      maxlength: 32,
      trim: true,
    },
    lastName: {
      type: String,
      minlength: 2,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
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
    role: {
      type: String,
      enum: ["user", "admin", "instructor", "student"],
      default: "student",
    },
    photo: {
      type: String,
      default: "default.jpg",
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bycryptjs.genSalt(12);
  this.password = await bycryptjs.hash(this.password, salt);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || !this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bycryptjs.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(
      this.passwordChangedAt.getTime() / 1000
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
