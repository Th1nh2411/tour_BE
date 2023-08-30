import mongoose from 'mongoose';
const date = new Date();
date.setHours(date.getHours() + 7);

const bookingSchema = new mongoose.Schema(
    {
        userInfo: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        tourInfo: {
            type: mongoose.Types.ObjectId,
            ref: 'Tour',
        },
        guestSize: {
            type: Number,
            required: true,
            min: 1,
            max: 50,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        createAt: {
            type: Date,
            required: true,
            default: date,
        },
        status: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: false },
);

export default mongoose.model('Booking', bookingSchema);
