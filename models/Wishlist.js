import mongoose from 'mongoose';
const date = new Date();
date.setHours(date.getHours() + 7);

const wishlistSchema = new mongoose.Schema(
    {
        userInfo: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        tourInfo: {
            type: mongoose.Types.ObjectId,
            ref: 'Tour',
        },
        createAt: {
            type: Date,
            required: true,
            default: date,
        },
    },
    { timestamps: false },
);

export default mongoose.model('Wishlist', wishlistSchema);
