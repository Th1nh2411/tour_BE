import Coupon from '../models/Coupon.js';
import UserCoupon from '../models/UserCoupon.js';

export const getAllCouponUser = async (req, res) => {
    try {
        const items = await UserCoupon.find({ userInfo: req.user.id }).populate('couponInfo').populate('userInfo');

        res.status(200).json({ success: true, message: 'Successful', data: items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// create new booking
export const createCoupon = async (req, res) => {
    const newCoupon = new Coupon(req.body);

    try {
        await newCoupon.save();

        res.status(200).json({ success: true, message: 'Create Successful' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateCoupon = async (req, res) => {
    const id = req.params.id;
    try {
        await Coupon.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true },
        );

        res.status(200).json({ success: true, message: 'Update Successful' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getDetailCoupon = async (req, res) => {
    const id = req.params.id;
    try {
        const coupon = await Coupon.findById(id);
        res.status(200).json({ success: true, message: 'Successful', data: coupon });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

export const getAllCoupon = async (req, res) => {
    try {
        if (req.user.role == 'user') {
            const items = await UserCoupon.find({ userInfo: req.user.id }).populate('couponInfo').populate('userInfo');

            res.status(200).json({ success: true, message: 'Successful', data: items });
        } else {
            const coupon = await Coupon.find();

            res.status(200).json({ success: true, message: 'Successful', data: coupon });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
