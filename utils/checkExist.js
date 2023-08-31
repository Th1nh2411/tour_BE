import Category from '../models/Category.js';
import Guide from '../models/Guide.js';
import User from '../models/User.js';
import Tour from '../models/Tour.js';

export const checkExistUsername = async (req, res, next) => {
    try {
        const username = req.body.username;

        const check = await User.findOne({ username });
        if (!check) {
            next();
        } else {
            res.status(400).json({ success: false, message: 'Username already exists' });
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
            res.status(400).json({ success: false, message: 'Phone number already exists' });
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
            res.status(400).json({ success: false, message: 'Email already exists' });
        }
    } catch (error) {
        res.status(501).json({ success: false, message: 'Middlewares Error' });
    }
};

export const checkExistCategory = async (req, res, next) => {
    try {
        const categoryName = req.body.categoryName;

        const check = await Category.findOne({ categoryName });
        if (!check) {
            next();
        } else {
            res.status(400).json({ success: false, message: 'Category already exists' });
        }
    } catch (error) {
        res.status(501).json({ success: false, message: 'Middlewares Error' });
    }
};

export const checkExistTour = async (req, res, next) => {
    try {
        const tourName = req.body.tourName;

        const check = await Tour.findOne({ tourName });
        if (!check) {
            next();
        } else {
            res.status(400).json({ success: false, message: 'Tour already exists' });
        }
    } catch (error) {
        res.status(501).json({ success: false, message: 'Middlewares Error' });
    }
};
