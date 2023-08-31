import mongoose from 'mongoose';

const guideSchema = new mongoose.Schema(
    {
        guideName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
        languages: {
            type: String,
            required: true,
        },
    },
    { timestamps: false },
);

export default mongoose.model('Guide', guideSchema);
