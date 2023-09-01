import User from '../models/User.js';

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
