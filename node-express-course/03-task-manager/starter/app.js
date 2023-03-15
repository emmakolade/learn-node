const express = require("express");
const app = express();
const routeTask = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

// middleware
app.use(express.json());
// static files
app.use(express.static("./public"));

// routes
app.use("/api/v1/tasks", routeTask);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}....`));
  } catch (error) {
    console.log(error);
  }
};

start();
