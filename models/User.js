import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
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
            required: true,
        },
        verifyID: {
            type: String,
            default: '0',
        },
        photo: {
            type: String,
            default: 'https://res.cloudinary.com/dpgjnngzt/image/upload/v1692954334/anhdaidien_onsafn.jpg',
        },
        role: {
            type: String,
            default: 'user',
        },
    },
    { timestamps: false },
);

export default mongoose.model('User', userSchema);
