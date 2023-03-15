require("dotenv").config();

// asyn errors
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const routeProducts = require("./routes/products");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// midddleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send('<h1>StoreAPI</h1><a href="/api/v1/products"> Products Route</a>');
});
app.use("/api/v1/products", routeProducts);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Port and DB
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // TODO: connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening to ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
