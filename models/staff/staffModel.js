const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    hiredDate: Date,
    exitDate: Date,
    report_to: String,
    address: String,
    city: String,
    state: String,
    country: String,
    staffId: {
      type: String,
      default: null,
      unique: true,
    },
    rank: String,
    position: String,
    avatar: {
      name: {
        type: String,
        trim: true,
      },
      file: {
        type: String,
      },
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

const Staff = mongoose.model("Staff", StaffSchema);

module.exports = Staff;
