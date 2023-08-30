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
        languages: {
            type: String,
            required: true,
        },
    },
    { timestamps: false },
);

export default mongoose.model('Guide', guideSchema);
