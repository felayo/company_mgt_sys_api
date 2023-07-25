const express = require("express");
const mongoose = require("mongoose");

// const { NODE_ENV } = process.env;

const app = require("./app");

/* Loading the environment variables from the .env file. */
require("dotenv").config();

const port = process.env.PORT || 4001;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(app.listen(port), console.log(`server running on port ${port}`))
  .catch((err) => console.log(err));
