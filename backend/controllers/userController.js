const userModel = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// This function retrieves all users from the database using the userModel's find method.
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await userModel.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

// This function retrieves a user by its ID from the database and sends it in the response. If no user is found, it triggers an error handler with a 404 status.
exports.getUserByID = catchAsync(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});


// This function updates a user by its ID using the provided request body. If no user is found with the provided ID, it triggers an error handler with a 404 status code.
exports.updateUser = catchAsync(async (req, res, next) => {
  // If user does not provide current password
  if (!req.body.currentPassword) {
    return next(new AppError("Please provide current password", 400));
  }
  console.log(req.user.id);
  const user = await userModel.findById(req.user.id).select("+password");

  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError("Incorrect password", 401));
  }
  // filter user input
  const filteredKeys = ["firstName", "lastName"];
  const filteredData = Object.fromEntries(
    Object.entries(req.body).filter(([key]) => filteredKeys.includes(key))
  );
  // update user
  const updatedUser = await userModel.findByIdAndUpdate(
    req.user.id,
    filteredData,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

// This function deletes a user by its ID. It sets the user's active field to false instead of removing the user from the database.
exports.deleteUser = catchAsync(async (req, res, next) => {
  await userModel.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
});


// This function retrieves the current user from the database using the user ID stored in the request object.
exports.getMe = catchAsync(async (req, res, next) => {
  const user = await userModel.findById(req.user.id);
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
