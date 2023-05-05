const mongoose = require('mongoose');
// Database schema format for MongoDB
const doctorSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            require: true
        },
        lastName: {
            type: String,
            require: true
        },
        userId: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        phoneNumber: {
            type: String,
            require: true
        },
        address: {
            type: String,
            require: true
        },
        postcode: {
            type: String,
            require: true
        },
        specialty: {
            type: String,
            require: true
        },
        workTimings: {
            type: Array,
            require: true
        },
        status: {
            type: String,
            default: 'Approved',
        },
        isDoctor: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const doctorModel = mongoose.model('doctors', doctorSchema);
module.exports = doctorModel