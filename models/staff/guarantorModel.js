const mongoose = require("mongoose");

const GuarantorSchema = new mongoose.Schema(
  {
    name: String,
    occupation: String,
    job_title: String,
    place_of_work: String,
    Address: String,
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

const Guarantor = mongoose.model("Guarantor", GuarantorSchema);

module.exports = Guarantor;
