const mongoose = require("mongoose");

const CertificationSchema = new mongoose.Schema(
  {
    cert_name: String,
    cert_body: String,
    status: String,
    date_obtained: Date,
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

const Certification = mongoose.model("Certification", CertificationSchema);

module.exports = Certification;
