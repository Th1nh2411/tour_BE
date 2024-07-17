import mongoose from 'mongoose';

const userTempSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    photo: String,
    address: String,
    fullName: String,
    phoneNumber: String,
    activeID: Number,
    userId: mongoose.Schema.Types.ObjectId, // Dùng cho trường hợp update email
    createdAt: { type: Date, expires: '30m', default: Date.now } // Document sẽ hết hạn sau 24 giờ
});

export default mongoose.model('UserTemp', userTempSchema);
