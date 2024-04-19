const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");

dotenv.config({ path: "./.env" });

const db = process.env.DATABASE_Local;

mongoose
  .connect(db)
  .then(() => console.log("MongoDB has been connected sucessfully!"))
  .catch((er) => console.log(`Error connecting MongoDB: ${er}`));

const app = require("./app");
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server live at http://127.0.0.1:${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled Rejection! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exception! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
