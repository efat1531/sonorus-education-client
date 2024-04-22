const userModel = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const uitl = require("util");
const nodemailer = require("nodemailer");

// Email templates
const {
  resetPasswordTemplateHTML,
  welcomeUserTemplateHTML,
  passwordChangedEmailTemplate,
} = require("../utils/emailTemplate");

// Signup function to create a new user
exports.signup = catchAsync(async (req, res, next) => {
  // Deconstruct the request body
  const { firstName, lastName, email, password, passwordConfirm } = req.body;
  // Check if the required fields are present
  if (!firstName || !email || !password || !passwordConfirm) {
    return next(
      new AppError(
        "FirstName, Email, Password, Confirm Password are required!",
        400
      )
    );
  }
  // Try to create a new user
  const newUser = await userModel.create({
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
  });

  // Select the fields to send in the response
  const user = await userModel
    .findById(newUser._id)
    .select(
      "-active -passwordChangedAt -createdAt -updatedAt -passwordResetToken -passwordResetExpires +role"
    );
  // Create a JWT token with the user id and role and send it in the response
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

  // set the cookie in the response
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: process.env.NODE_ENV === "production" ? true : false,
    httpOnly: true,
  });

  // Send the response with json token and cookie
  res.status(201).json({
    status: "success",
    token,
    data: {
      user: user,
    },
  });
});

// Login function to login the user
exports.login = catchAsync(async (req, res, next) => {
  // Deconstruct the request body
  const { email, password } = req.body;
  // Check if the required fields are present
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }
  // Find the user with the email 
  const user = await userModel
    .findOne({ email, active: { $ne: false } })
    .select("+password +role");
  // Check if the user exists and the password is correct
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  // Create a JWT token with the user id and role and send it in the response
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  // set the cookie in the response
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: process.env.NODE_ENV === "production" ? true : false,
    httpOnly: true,
  });
  // Send the response with json token and cookie
  res.status(200).json({
    status: "success",
    token,
  });
});

// Logout function to logout the user
exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ status: "success" });
};

// Protect function to check if the user is logged in or not
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // Check if the token is present in the headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // Check if the token is present in the cookies
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  // If the token is not present send an error 
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }
  // Verify the token
  const decoded = await uitl.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  // Check if the user still exists
  const currentUser = await userModel.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token does no longer exist", 401)
    );
  }

  // Check if the user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again", 401)
    );
  }

  // Grant access to protected route
  // Set the user in the request object
  req.user = currentUser;
  next();
});

// Restrict function to restrict the access to the user based on the role
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // Check if the user role is present in the roles array
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

// isLoggedIn function to check if the user is logged in or not
exports.isLoggedIn = async (req, res, next) => {
  // Check if the token is present in the cookies
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


// Forget password function to forget the password
exports.forgetPassword = catchAsync(async (req, res, next) => {
  // Check if the email is present in the request body
  if(!req.body.email){
    return next(new AppError("Please provide email", 400));
  }
  // find the user with the email
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email address", 404));
  }
  // Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  // Save the user with the reset token
  await user.save({ validateBeforeSave: false });
  // Send the reset token to the user email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetPassword/${resetToken}`;
  // Send email to user
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
  // Send the response
  res.status(200).json({
    status: "success",
    message: "Token sent to email!",
    token: resetToken,
  });
});

// Reset password function to reset the password
exports.resetPassword = catchAsync(async (req, res, next) => {
  // Check if the token is present in the request params
  if(!req.params.token){
    return next(new AppError("Token is required", 400));
  }
  // Hash the token
  const hashedToken = require("crypto")
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  
  // Check if the password and confirm password is present in the request body
  if (!req.body.password || !req.body.passwordConfirm) {
    return next(
      new AppError("Password and Confirm Password are required!", 400)
    );
  }
  // Find the user with the token
  const user = await userModel
    .findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    })
    .select("+password");
  // Check if the user exists
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  // Check if the current password is same as the new password
  if (await user.correctPassword(req.body.password, user.password)) {
    return next(
      new AppError("New password cannot be the same as the old password", 400)
    );
  }
  // Set the new password and reset the token and expires
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  // Save the user
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
  // Send the response
  res.status(200).json({
    status: "success",
    // token,
    message: "Password reset successful. Please login with new password",
  });
});

// Update password function to update the password
exports.updatePassword = catchAsync(async (req, res, next) => {
  // Get the user by ID
  const user = await userModel.findById(req.user.id).select("+password");
  // check if the user is present
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  // Check if the current password is same as the new password
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError("Your current password is wrong", 401));
  }
  // Check if the password and confirm password is present in the request body
  if (req.body.password === req.body.currentPassword) {
    return next(
      new AppError("New password cannot be the same as the old password", 400)
    );
  }
  // Set the new password
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
  // Send the email
  transporter.sendMail(message);
  // Send the response
  res.status(200).json({
    status: "success",
    // token,
    message: "Password updated successfully. Please login with new password",
  });
});
