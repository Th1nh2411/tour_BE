import mongoose from 'mongoose';

const date = new Date();
date.setHours(date.getHours() + 7);
date.setDate(date.getDay() + 30);

const userCouponSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        couponId: {
            type: mongoose.Types.ObjectId,
            ref: 'Coupon',
        },
        validUntil: {
            type: Date,
            default: date,
        },
    },
    { timestamps: false },
);

export default mongoose.model('UserCoupon', userCouponSchema);
