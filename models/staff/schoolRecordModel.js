const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema(
  {
    name: String,
    course: String,
    degree: String,
    grade: String,
    graduation_date: Date,
    certificate: {
      name: {
        type: String,
        trim: true,
      },
      file: {
        type: String,
      },
    },
    employee: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const School = mongoose.model("School", SchoolSchema);

module.exports = School;
