import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
    {
        userInfo: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        message: {
            type: String,
            required: true,
        },
    },
    { timestamps: false },
);

export default mongoose.model('Feedback', feedbackSchema);
