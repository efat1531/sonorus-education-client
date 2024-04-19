const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const Tokens = require("csrf");
const tokens = new Tokens();
const cookieParser = require("cookie-parser");
const hpp = require("hpp");
const xss = require("xss-clean");

const mongooseSanitize = require("express-mongo-sanitize");

const AppError = require("./utils/appError");
const globalErrorController = require("./controllers/errorController");

const coursesRouter = require("./routes/courseRoute");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");

const app = express();

app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(hpp());
app.use(xss());

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use((req, res, next) => {
  const secret = req.cookies._csrf || tokens.secretSync();
  res.cookie("_csrf", secret);
  req.csrfToken = tokens.create(secret);
  next();
});

app.use(mongooseSanitize());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the API",
  });
});

const generalLimiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
  standardHeaders: true,
});

const authLimiter = rateLimit({
  max: 10,
  windowMs: 15 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
  standardHeaders: true,
});

app.use("/api/v1/courses", generalLimiter, coursesRouter);
app.use("/api/v1/auth", authLimiter, authRouter);
app.use("/api/v1/users", generalLimiter, userRouter);
app.use("/api/v1/reviews", generalLimiter, reviewRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorController);

module.exports = app;
