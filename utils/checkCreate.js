import User from '../models/User.js';
import Tour from '../models/Tour.js';

export const checkActiveAccount = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (user.isActive) {
            next();
        } else {
            res.status(400).json({
                success: false,
                message: 'Tài khoản của bạn chưa được kích hoạt, không thể đặt tour',
            });
        }
    } catch (error) {
        res.status(501).json({ success: false, message: 'Middlewares Error' });
    }
};

export const checkDateBooking = async (req, res, next) => {
    try {
        const tour = await Tour.findById(req.body.tourInfo);
        const date = new Date();
        date.setHours(date.getHours() + 7);
        if (tour.startDate > date) {
            next();
        } else {
            res.status(400).json({
                success: false,
                message: 'Đã hết thời gian đặt, xin vui lòng quay lại sau',
            });
        }
    } catch (error) {
        res.status(501).json({ success: false, message: 'Middlewares Error' });
    }
};
