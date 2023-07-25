const mongoose = require('mongoose');

const VehicleUserSchema = mongoose.Schema(
    {
        vehicle_user: String
    },
    { timestamps: true }
);

const VehicleUser = mongoose.model('VehicleUser', VehicleUserSchema);

module.exports = VehicleUser;