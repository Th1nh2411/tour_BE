import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        rank: {
            type: Number,
            required: true,
            default: 0,
        },
        fullName: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        address: {
            type: String,
        },
        verifyID: {
            type: String,
            default: '0',
        },
        photo: {
            type: String,
            default: 'http://res.cloudinary.com/dpgjnngzt/image/upload/v1692954334/anhdaidien_onsafn.jpg',
        },
        role: {
            type: String,
            default: 'user',
        },
    },
    { timestamps: false },
);

export default mongoose.model('User', userSchema);
