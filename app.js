const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const app = express();

const errorHandler = require("./middleware/error");
const { logger } = require("./middleware/logger");
const corsOptions = require('./config/corsOptions')

// import routes
const auth = require("./routes/auth/auth");
const users = require("./routes/users/users");
const employeeRouteCtrl = require("./routes/employee/combineRoutes");
const adminRouteCtrl = require("./routes/admin/adminCombineRoute");
const vehicleRoute = require("./routes/vehicles/vehicleCombineRoute");


app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieParser())


app.get("/api", (req, res) => {
  res.send(
    "Hello there! \nA greeting from Ayo\nWelcome to winelight portal backend microservice application.\nPlease go back to our main page and check out our services.\nI am sure there are so many ways we can help you out.\n:-D"
  );
});

app.get("/", (req, res) => {
  res.send("Welcome to Winelight Portal");
});

app.use("/api/auth", auth);
app.use("/api/user", users);
app.use("/api/employee", employeeRouteCtrl);
app.use("/api/admin", adminRouteCtrl);
app.use("/api/vehicle", vehicleRoute);

app.use(errorHandler);

module.exports = app;
