import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        chat_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Chat',
            require: true,
        },
        content: {
            type: String,
            require: true,
        },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true },
);

export default mongoose.model('Message', messageSchema);
