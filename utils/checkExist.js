import Category from '../models/Category.js';
import Guide from '../models/Guide.js';
import User from '../models/User.js';
import Tour from '../models/Tour.js';
import Booking from '../models/Booking.js';

export const checkExistUsername = async (req, res, next) => {
    try {
        const username = req.body.username;

        const check = await User.findOne({ username });
        if (!check) {
            next();
        } else {
            res.status(400).json({ success: false, message: 'Username đã tồn tại' });
        }
    } catch (error) {
        res.status(501).json({ success: false, message: 'Middlewares Error' });
    }
};

export const checkExistPhoneNumber = async (req, res, next) => {
    try {
        const phoneNumber = req.body.phoneNumber;

        const checkUser = await User.findOne({ phoneNumber });
        const checkGuide = await Guide.findOne({ phoneNumber });
        if (!checkUser && !checkGuide) {
            next();
        } else {
            res.status(400).json({ success: false, message: 'Số điện thoại đã tồn tại' });
        }
    } catch (error) {
        res.status(501).json({ success: false, message: 'Middlewares Error' });
    }
};

export const checkExistEmail = async (req, res, next) => {
    try {
        const email = req.body.email;

        const checkUser = await User.findOne({ email });
        const checkGuide = await Guide.findOne({ email });
        if (!checkUser && !checkGuide) {
            next();
        } else {
            res.status(400).json({ success: false, message: 'Email đã tồn tại' });
        }
    } catch (error) {
        res.status(501).json({ success: false, message: 'Middlewares Error' });
    }
};

export const checkExistCategoryName = async (req, res, next) => {
    try {
        const categoryName = req.body.categoryName;

        const check = await Category.findOne({ categoryName });
        if (!check) {
            next();
        } else {
            res.status(400).json({ success: false, message: 'Category đã tồn tại' });
        }
    } catch (error) {
        res.status(501).json({ success: false, message: 'Middlewares Error' });
    }
};

export const checkExistTourName = async (req, res, next) => {
    try {
        const tourName = req.body.tourName;

        const check = await Tour.findOne({ tourName });
        if (!check) {
            next();
        } else {
            res.status(400).json({ success: false, message: 'Tour đã tồn tại' });
        }
    } catch (error) {
        res.status(501).json({ success: false, message: 'Middlewares Error' });
    }
};

export const checkExistTour = async (req, res, next) => {
    try {
        const id = req.params.id;

        const check = await Tour.findById(id);
        if (check) {
            next();
        } else {
            res.status(400).json({ success: false, message: 'Tour không tồn tại' });
        }
    } catch (error) {
        res.status(501).json({ success: false, message: 'Middlewares Error' });
    }
};

export const checkExistBooking = async (req, res, next) => {
    try {
        const id = req.params.id;
        const check = await Booking.findById(id);
        if (check) {
            next();
        } else {
            res.status(400).json({ success: false, message: 'Booking không tồn tại' });
        }
    } catch (error) {
        res.status(501).json({ success: false, message: 'Middlewares Error' });
    }
};

export const checkUnPaidBooking = async (req, res, next) => {
    try {
        const check = await Booking.findOne({
            userInfo: req.user.id,
            $or: [{ status: 1 }, { status: 0 }],
        });
        if (!check) {
            next();
        } else {
            res.status(400).json({ success: false, message: 'Đang có đơn chưa thanh toán, không thể đặt thêm' });
        }
    } catch (error) {
        res.status(501).json({ success: false, message: 'Middlewares Error' });
    }
};

export const checkExistCategory = async (req, res, next) => {
    try {
        const id = req.params.id;

        const check = await Category.findById(id);
        if (check) {
            next();
        } else {
            res.status(400).json({ success: false, message: 'Category không tồn tại' });
        }
    } catch (error) {
        res.status(501).json({ success: false, message: 'Middlewares Error' });
    }
};

export const checkExistGuide = async (req, res, next) => {
    try {
        const id = req.params.id;

        const check = await Guide.findById(id);
        if (check) {
            next();
        } else {
            res.status(400).json({ success: false, message: 'Guide không tồn tại' });
        }
    } catch (error) {
        res.status(501).json({ success: false, message: 'Middlewares Error' });
    }
};

export const checkExistUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        const check = await User.findById(id);
        if (check) {
            next();
        } else {
            res.status(400).json({ success: false, message: 'User không tồn tại' });
        }
    } catch (error) {
        res.status(501).json({ success: false, message: 'Middlewares Error' });
    }
};
