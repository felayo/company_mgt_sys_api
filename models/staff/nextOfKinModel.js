const mongoose = require("mongoose");

const NextOfKinSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    relationship: String,
    phone: String,
    email: String,
    employee: {
      type: mongoose.Schema.ObjectId,
      ref: "Staff",
      required: true,
    },
  },
  { timestamps: true }
);

const NextOfKin = mongoose.model("NextOfKin", NextOfKinSchema);

module.exports = NextOfKin;
