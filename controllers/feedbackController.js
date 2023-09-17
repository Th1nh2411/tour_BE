import Feedback from '../models/Feedback.js';
import User from '../models/User.js';

export const getAllFeedback = async (req, res) => {
    try {
        const data = await Feedback.find({}).populate('userInfo');
        res.status(200).json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createFeedback = async (req, res) => {
    const newFeedback = new Feedback({
        userInfo: req.user.id,
        message: req.body.message,
    });
    try {
        await newFeedback.save();

        res.status(200).json({ success: true, message: 'Phản hồi thành công' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
