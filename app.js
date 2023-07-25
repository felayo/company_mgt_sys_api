const express = require("express");
const cors = require("cors");

const errorHandler = require("./middleware/error");

// import routes
const auth = require("./routes/auth/auth");
const users = require("./routes/users/users");
const staffRouteCtrl = require("./routes/staff/staffCombineRoute");
const adminRouteCtrl = require("./routes/admin/adminCombineRoute");
const vehicleRoute = require("./routes/vehicles/vehicleCombineRoute");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

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
app.use("/api/staff", staffRouteCtrl);
app.use("/api/admin", adminRouteCtrl);
app.use("/api/vehicle", vehicleRoute);

app.use(errorHandler);

module.exports = app;
