import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
    {
        participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
        chat_name: {
            type: String,
            ref: 'User',
        },
    },
    { timestamps: true },
);

export default mongoose.model('Chat', chatSchema);
