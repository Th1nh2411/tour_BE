import mongoose from 'mongoose';

const messengerSchema = new mongoose.Schema(
    {
        user_id1: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        user_id2: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        message: Array,
    },
    { timestamps: false },
);

export default mongoose.model('Messenger', messengerSchema);
