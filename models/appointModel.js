const mongoose = require('mongoose');
// Database schema format for MongoDB
const appointSchema = new mongoose.Schema(
    {
        date: {
            type: String,
            require: true
        },
        time: {
            type: String,
            required: true
        },
        userID: {
            type: String,
            required: true
        },
        docID: {
            type: String,
            required: true
        },

    },{
        timestamps: true
    });
    
    const appointModel = mongoose.model('appointments', appointSchema);
    
    module.exports = appointModel;