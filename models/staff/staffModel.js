const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    middleName: String,
    phone: String,
    birthday: Date,
    hiredDate: Date,
    exitDate: Date,
    maritalStatus: String,
    report_to: String,
    address: String,
    city: String,
    local_govt: String,
    state: String,
    country: String,
    pfa: String,
    pfa_number: String,
    bank_name: String,
    account_number: String,
    account_name: String,
    tax_id: String,
    nhf: String,
    nin: String,
    passport: String,
    blood_group: String,
    genotype: String,
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
