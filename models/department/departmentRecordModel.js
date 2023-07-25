const mongoose = require("mongoose");

const DepartmentRecordSchema = new mongoose.Schema(
    {
        department: {
            type: mongoose.Schema.ObjectId,
            ref: "Department",
            required: true
        },
        staff: {
            type: mongoose.Schema.ObjectId,
            ref: "Staff",
            required: true
        }
    }
);

const DepartmentRecords = mongoose.model("DepartmentRecords", DepartmentRecordSchema);

module.exports = DepartmentRecords;
