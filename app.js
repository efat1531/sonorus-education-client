const express = require("express");
const morgan = require("morgan");

const coursesRouter = require("./routes/courseRoute");

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to the API"
    });
});

app.use("/api/v1/courses", coursesRouter);

module.exports = app;
  