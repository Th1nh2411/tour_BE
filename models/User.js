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
            unique: true,
            required: true,
            validate: [
                {
                    validator: function (v) {
                        return /\S+@\S+\.\S+/.test(v);
                    },
                    message: 'Email không hợp lệ',
                },
                {
                    validator: async function (v) {
                        const count = await this.model('User').countDocuments({ email: v });
                        return count === 0;
                    },
                    message: 'Email đã tồn tại',
                },
            ],
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
            unique: true,
            validate: [
                {
                    validator: function (v) {
                        return /^\d{10}$/.test(v);
                    },
                    message: 'Số điện thoại phải có đúng 10 chữ số',
                },
            ],
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
