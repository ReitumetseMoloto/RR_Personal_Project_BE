const  mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
    first_Name:{
        type: String,
        required: true
    },
    last_Name:{
        type: String,
        required: true
    },
    id_Number:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        enum: {
            values: ["Male", "Female", "Other"],
            message: "Please choose gender using the above options",
        },
        required: true
    },
    cellphone_Number:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    dateTime:{
        type: Date,
        required: true
    }
});
module.exports = mongoose.model('bookings', BookingSchema)