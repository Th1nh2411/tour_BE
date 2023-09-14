import mongoose from 'mongoose';

const messengerSchema = new mongoose.Schema(
    {
        id_user1: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        id_user2: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        content: Array,
    },
    { timestamps: false },
);

export default mongoose.model('Messenger', messengerSchema);
