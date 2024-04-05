const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorController = require("./controllers/errorController");

const coursesRouter = require("./routes/courseRoute");
const authRouter = require("./routes/authRoutes");

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the API",
  });
});

app.use("/api/v1/courses", coursesRouter);
app.use("/api/v1/auth", authRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorController);

module.exports = app;