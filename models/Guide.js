import mongoose from 'mongoose';

const guideSchema = new mongoose.Schema(
    {
        guideName: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            default: 'http://res.cloudinary.com/dpgjnngzt/image/upload/v1692954334/anhdaidien_onsafn.jpg',
        },
        email: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        languages: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    { timestamps: false },
);

export default mongoose.model('Guide', guideSchema);
