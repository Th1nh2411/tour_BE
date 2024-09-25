import Chat from '../models/Chat.js';
import Message from '../models/Message.js';
import User from '../models/User.js';

const findChatByParticipants = async (participants) => {
    let chat = await Chat.findOne({
        participants: { $all: participants, $size: 2 },
    });
    if (!chat) {
        const newChat = new Chat({ participants });
        chat = await newChat.save();
    }
    return chat;
};

export const getMessageByUser = async (req, res) => {
    const sender = req.user.id;
    const user_id = req.query.user_id;
    try {
        const chat = await findChatByParticipants([sender, user_id]);

        if (!chat) {
            res.status(200).json({ success: true, data: [], chat });
            return;
        }

        const messages = await Message.find({ chat_id: chat._id }).sort({ createdAt: 1 });

        res.status(200).json({ success: true, data: messages || [], chat_id: chat._id });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const getSupportMessage = async (req, res) => {
    const sender = req.user.id;
    try {
        const admin = await User.findOne({ username: 'admin' });
        const chat = await findChatByParticipants([sender, admin._id]);

        if (!chat) {
            res.status(200).json({ success: true, data: [] });
            return;
        }
        const messages = await Message.find({ chat_id: chat._id }).sort({ createdAt: 1 });
        res.status(200).json({ success: true, data: messages || [], chat_id: chat._id });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const sendMessage = async (req, res) => {
    const sender = req.user.id;
    const chat_id = req.body.chat_id;
    try {
        const insertData = {
            chat_id,
            user_id: sender,
            content: req.body.message,
        };
        const newMessage = new Message(insertData);
        await newMessage.save();
        res.status(200).json({ success: true, message: 'Gửi tin nhắn thành công' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const sendSupportMessage = async (req, res) => {
    const sender = req.user.id;
    try {
        const admin = await User.findOne({ username: 'admin' });
        const chat = await findChatByParticipants([sender, admin._id]);
        if (chat) {
            const insertData = {
                chat_id: chat._id,
                user_id: sender,
                content: req.body.message,
            };
            const newMessage = new Message(insertData);
            await newMessage.save();
        }
        res.status(200).json({ success: true, message: 'Gửi tin nhắn thành công' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const deleteMessage = async (req, res) => {
    const chat_id = req.body.chat_id;
    try {
        await Chat.deleteOne({ chat_id });
        await Message.deleteMany({ chat_id });
        res.status(200).json({ success: true, message: 'Xóa tin nhắn thành công' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
