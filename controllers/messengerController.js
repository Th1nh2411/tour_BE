import Messenger from '../models/Messenger.js';
import User from '../models/User.js';

export const getAllMessage = async (req, res) => {
    const id_user1 = req.user.id;
    const id_user2 = req.query.id_user;
    try {
        const messenger = await Messenger.findOne({ id_user1: id_user1, id_user2: id_user2 });
        res.status(200).json({ success: true, data: messenger });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const sendMessage = async (req, res) => {
    const id_user1 = req.user.id;
    const id_user2 = req.body.id_user;
    const date = new Date();
    date.setHours(date.getHours() + 7);
    const data = {
        message: req.body.message,
        sendTime: date,
    };

    const messenger = await Messenger.findOne({ id_user1: id_user1, id_user2: id_user2 });

    messenger.content.push(data);

    try {
        messenger.save();
        res.status(200).json({ success: true, message: 'Gửi tin nhắn thành công' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const getSupportMessage = async (req, res) => {
    const id_user1 = req.user.id;
    const supporter = await User.findOne({ role: 'admin' });
    const id_user2 = supporter._id;
    try {
        const messenger = await Messenger.findOne({ id_user1: id_user1, id_user2: id_user2 });
        res.status(200).json({ success: true, data: messenger });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const sendSupportMessage = async (req, res) => {
    const id_user1 = req.user.id;
    const supporter = await User.findOne({ role: 'admin' });
    const id_user2 = supporter.id;
    const date = new Date();
    date.setHours(date.getHours() + 7);
    const data = {
        message: req.body.message,
        sendTime: date,
        sender: id_user1,
    };

    try {
        let messenger = await Messenger.findOne({ id_user1, id_user2 });
        if (!messenger) {
            messenger = new Messenger({ id_user1, id_user2, content: [] });
        }
        messenger.content.push(data);
        messenger.save();
        res.status(200).json({ success: true, message: 'Gửi tin nhắn thành công' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
