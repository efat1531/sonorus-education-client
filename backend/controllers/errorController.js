const AppError = require("../utils/appError");

// This is a error handling middleware function thats sends the error in development mode 
const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

// This is a error handling middleware function thats sends the error in production mode
const sendProductionError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error from here",
      message: "Something went wrong",
    });
  }
};

// This is a error handling middleware function that handles all the errors
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    if (err.name === "CastError")
      err = new AppError(`Invalid ${err.path}: ${err.value}`, 400);
    else if (err.code === 11000)
      err = new AppError("Duplicate field value entered", 400);
    else if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((el) => el.message);
      err = new AppError(`Invalid input data. ${errors.join(". ")}`, 400);
    } else if (err.name === "JsonWebTokenError")
      err = new AppError("Invalid token. Please log in again", 401);
    else if (err.name === "TokenExpiredError")
      err = new AppError("Your token has expired. Please log in again", 401);
    sendProductionError(err, res);
  }
};
