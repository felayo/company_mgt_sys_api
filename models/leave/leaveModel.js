const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['annual', 'maternity'],
            default: 'annual'
        },
        start: {
            type: Date,
            required: true
        },
        end: {
            type: Date,
            required: true
        },
        reason: String,
        staff: {
            type: mongoose.Schema.ObjectId,
            ref: 'Staff',
            required: true
        },
    }
);

const Leave = mongoose.model("Leave", LeaveSchema);

module.exports = Leave;