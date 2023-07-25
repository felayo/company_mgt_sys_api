const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    department: {
      type: mongoose.Schema.ObjectId,
      ref: "Department",
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    documents: [
      {
        name: {
          type: String,
          trim: true,
        },
        file: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", DocumentSchema);

module.exports = Document;
