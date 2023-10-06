const mongoose = require("mongoose");

const PreviousEmploymentSchema = new mongoose.Schema(
  {
    company_name: String,
    job_title: String,
    from_date: Date,
    to_date: Date,
    job_description: String,
    reason_for_leaving: String,
    employee: {
      type: mongoose.Schema.ObjectId,
      ref: "Staff",
      required: true,
    },
  },
  { timestamps: true }
);

const EmploymentRecord = mongoose.model("EmploymentRecord", PreviousEmploymentSchema);

module.exports = EmploymentRecord;
