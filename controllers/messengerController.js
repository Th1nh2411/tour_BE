import Messenger from '../models/Messenger.js';
import User from '../models/User.js';

export const getAllMessage = async (req, res) => {
    const id_user1 = req.user.id;
    const id_user2 = req.query.id_user;
    try {
        const messenger = await Messenger.findOne({ id_user1: id_user1, id_user2: id_user2 });
        messenger
            ? res.status(200).json({ success: true, data: messenger })
            : res.status(400).json({ success: true, data: 'Không có tin nhắn' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const transAllMessageToReaded = async (req, res) => {
    let id_user1;
    const supporter = await User.findOne({ role: 'admin' });
    const id_user2 = supporter.id;
    if (req.user.role == 'admin') {
        id_user1 = req.body.user;
    }
    if (req.user.role == 'user') {
        id_user1 = req.user.id;
    }
    try {
        const messenger = await Messenger.findOne({
            id_user1: id_user1,
            id_user2: id_user2,
            'content.sender': id_user1,
        });
        if (messenger) {
            const unreadMessages = messenger.content.filter((message) => message.isReaded === false);
            for (let i = 0; i < unreadMessages.length; i++) {
                await Messenger.updateOne(
                    {
                        id_user1: id_user1,
                        id_user2: id_user2,
                        'content.isReaded': false,
                    },
                    { $set: { 'content.$.isReaded': true } },
                );
            }
            unreadMessages
                ? res.status(200).json({ success: true, data: 'Đã đọc toàn bộ tin nhắn' })
                : res.status(400).json({ success: false, data: 'Không có tin nhắn chưa đọc' });
        } else {
            res.status(400).json({ success: false, data: 'Không có tin nhắn chưa đọc' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const countMessageUnRead = async (req, res) => {
    let id_user1;
    const supporter = await User.findOne({ role: 'admin' });
    const id_user2 = supporter._id;
    if (req.user.role == 'admin') {
        id_user1 = req.body.user;
    }
    if (req.user.role == 'user') {
        id_user1 = req.user.id;
    }
    try {
        const messenger = await Messenger.findOne({
            id_user1: id_user1,
            id_user2: id_user2,
            'content.sender': id_user1,
        });
        const unreadMessages = messenger.content.filter((message) => message.isReaded === false);
        unreadMessages
            ? res.status(200).json({ success: true, data: unreadMessages.length })
            : res.status(200).json({ success: true, data: 0 });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getSupportMessage = async (req, res) => {
    let id_user1;
    const currentPage = req.query.currentPage || 1;
    const supporter = await User.findOne({ role: 'admin' });
    let canLoadMore = true;
    const id_user2 = supporter._id;
    if (req.user.role == 'admin') {
        id_user1 = req.query.user;
    }
    if (req.user.role == 'user') {
        id_user1 = req.user.id;
    }
    try {
        const messenger = await Messenger.findOne({ id_user1: id_user1, id_user2: id_user2 });
        let messages = [];
        if (messenger.content.length > 10 * currentPage) {
            // Tin nhắn đủ sẽ tải thêm 10
            for (let i = 10 * currentPage - 10; i < 10 * currentPage; i++) {
                messages[i] = messenger.content[i];
            }
        } else {
            // Tin nhắn không đủ chỉ tải tới độ dài mảng content
            canLoadMore = false;
            for (let i = 10 * currentPage - 10; i < messenger.content.length; i++) {
                messages[i] = messenger.content[i];
            }
        }
        messenger
            ? res.status(200).json({ success: true, data: messages, canLoadMore, currentPage })
            : res.status(400).json({ success: true, data: 'Không có tin nhắn' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const sendSupportMessage = async (req, res) => {
    let id_user1;
    const supporter = await User.findOne({ role: 'admin' });
    let id_user2 = supporter.id;
    const date = new Date();
    date.setHours(date.getHours() + 7);
    let data = {};
    if (req.user.role == 'admin') {
        id_user1 = req.body.id_user;
        data = {
            message: req.body.message,
            sendTime: date,
            sender: id_user2,
            isReaded: false,
        };
    }
    if (req.user.role == 'user') {
        id_user1 = req.user.id;
        data = {
            message: req.body.message,
            sendTime: date,
            sender: id_user1,
            isReaded: false,
        };
    }
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
