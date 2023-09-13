import mongoose from 'mongoose';
const date = new Date();
date.setHours(date.getHours() + 7);

const paymentSchema = new mongoose.Schema(
    {
        userInfo: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        bookingInfo: {
            type: mongoose.Types.ObjectId,
            ref: 'Booking',
        },
        paymentDate: {
            type: Date,
            required: true,
            default: date,
        },
        amount: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    { timestamps: false },
);

export default mongoose.model('Payment', paymentSchema);
