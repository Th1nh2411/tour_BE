import Chat from '../models/Chat.js';
import Message from '../models/Message.js';
import User from '../models/User.js';

export const getMessageByUser = async (req, res) => {
    const sender = req.user.id;
    const user_id = req.query.user_id;
    try {
        const chat = await Chat.findOne({
            participants: { $all: [sender, user_id], $size: 2 },
        });
        
        if (!chat) {
            res.status(200).json({ success: true, data: [] , chat});
            return
        }
        
        const messages = await Message.find({ chat_id: chat._id }).sort({ createdAt: 1 });

        res.status(200).json({ success: true, data: messages});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const getSupportMessage = async (req, res) => {
    const sender = req.user.id;
    try {
        const admin = await User.findOne({ username: 'admin' });
        const chat = await Chat.findOne({
            participants: { $all: [sender, admin._id], $size: 2 },
        });

        if (!chat) {
            res.status(200).json({ success: true, data: [] });
            return
        }

        const messages = await Message.find({ chat_id: chat._id }).sort({ createdAt: 1 });
        res.status(200).json({ success: true, data: messages || [] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const sendMessage = async (req, res) => {
    const sender = req.user.id;
    const user_id = req.body.user_id;

    try {
        let chat = await Chat.findOne({
            participants: { $all: [sender, user_id], $size: 2 },
        });
        if (!chat) {
            const newChat = new Chat({
                participants: [sender, user_id],
            });
            chat = await newChat.save();
        }
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
export const sendSupportMessage = async (req, res) => {
    const sender = req.user.id;
    
    try {
        const admin = await User.findOne({username: 'admin'});
        const user_id = admin._id;
        let chat = await Chat.findOne({
            participants: { $all: [sender, user_id], $size: 2 },
        });
        if (!chat) {
            const newChat = new Chat({
                participants: [sender, user_id],
            });
            chat = await newChat.save();
        }
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
