const userModel = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const uitl = require("util");
const nodemailer = require("nodemailer");

const {
  resetPasswordTemplateHTML,
  welcomeUserTemplateHTML,
  passwordChangedEmailTemplate,
} = require("../utils/emailTemplate");

//
exports.signup = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password, passwordConfirm } = req.body;
  if (!firstName || !email || !password || !passwordConfirm) {
    return next(
      new AppError(
        "FirstName, Email, Password, Confirm Password are required!",
        400
      )
    );
  }
  const newUser = await userModel.create({
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
  });

  const user = await userModel
    .findById(newUser._id)
    .select(
      "-active -passwordChangedAt -createdAt -updatedAt -passwordResetToken -passwordResetExpires +role"
    );

  const token = jwt.sign(
    { id: newUser._id, role: newUser.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  // Send welcome email
  const message = {
    from: "Sonorous Education <welcome@sonorous-education.com>",
    to: user.email,
    subject: "Welcome to Sonorous Education",
    html: welcomeUserTemplateHTML(user),
  };

  // Additional options for Nodemailer
  message.headers = {
    "Content-Type": "text/html; charset=UTF-8",
  };

  // Create a SMTP transporter object
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Send the email
  transporter.sendMail(message);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: process.env.NODE_ENV === "production" ? true : false,
    httpOnly: true,
  });

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: user,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }
  const user = await userModel
    .findOne({ email, active: { $ne: false } })
    .select("+password +role");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: process.env.NODE_ENV === "production" ? true : false,
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ status: "success" });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }
  const decoded = await uitl.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  const currentUser = await userModel.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token does no longer exist", 401)
    );
  }
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again", 401)
    );
  }
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await util.promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      // 2) Check if user still exists
      const currentUser = await userModel.findById(decoded.id);
      if (!currentUser) {
        return next();
      }
      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }
      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.forgetPassword = catchAsync(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email address", 404));
  }
  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetPassword/${resetToken}`;

  const message = {
    from: "Sonorous Education <noreply@sonorous-education.com>",
    to: user.email,
    subject: "Password Reset for Sonorous Education Account",
    html: resetPasswordTemplateHTML(user, resetURL),
  };

  // Additional options for Nodemailer
  message.headers = {
    "Content-Type": "text/html; charset=UTF-8",
  };

  // Create a SMTP transporter object
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Send the email
  transporter.sendMail(message);

  res.status(200).json({
    status: "success",
    message: "Token sent to email!",
    token: resetToken,
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = require("crypto")
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  if (!req.body.password || !req.body.passwordConfirm) {
    return next(
      new AppError("Password and Confirm Password are required!", 400)
    );
  }
  const user = await userModel
    .findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    })
    .select("+password");
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  if (await user.correctPassword(req.body.password, user.password)) {
    return next(
      new AppError("New password cannot be the same as the old password", 400)
    );
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  //Send email to user
  const message = {
    from: "Sonorous Education <no-reply@sonorous-education.com>",
    to: user.email,
    subject: "Your password has been changed",
    html: passwordChangedEmailTemplate(user),
  };
  // Additional options for Nodemailer
  message.headers = {
    "Content-Type": "text/html; charset=UTF-8",
  };
  // Create a SMTP transporter object
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // Send the email
  transporter.sendMail(message);

  res.status(200).json({
    status: "success",
    // token,
    message: "Password reset successful. Please login with new password",
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await userModel.findById(req.user.id).select("+password");
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError("Your current password is wrong", 401));
  }
  if (req.body.password === req.body.currentPassword) {
    return next(
      new AppError("New password cannot be the same as the old password", 400)
    );
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  //send email to user
  const message = {
    from: "Sonorous Education <no-reply@sonorous-education.com>",
    to: user.email,
    subject: "Your password has been changed",
    html: passwordChangedEmailTemplate(user),
  };
  // Additional options for Nodemailer
  message.headers = {
    "Content-Type": "text/html; charset=UTF-8",
  };
  // Create a SMTP transporter object
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  transporter.sendMail(message);
  res.status(200).json({
    status: "success",
    // token,
    message: "Password updated successfully. Please login with new password",
  });
});
