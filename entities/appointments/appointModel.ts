import mongoose from "mongoose";

const appointSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        ref: 'User'
    },
    type: {
        type: String,
        required: true,
    },
    doctor: {
        type: String,
        required: true,
        ref: 'User'
    },
    date: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Canceled', 'Modified']
    }
}, {versionKey: false, timestamps: true});

const Appointment = mongoose.model("Appointment", appointSchema);

export default Appointment