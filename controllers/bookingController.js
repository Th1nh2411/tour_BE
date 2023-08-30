import Booking from '../models/Booking.js';
import Tour from '../models/Tour.js';
import Coupon from '../models/Coupon.js';
import User from '../models/User.js';

// create new booking
export const createBooking = async (req, res) => {
    const { tourInfo, couponInfo, guestSize } = req.body;
    try {
        const check = await Booking.findOne({
            tourInfo,
            status: 0,
        });
        if (!check) {
            const tour = await Tour.findById(tourInfo);
            // nếu có coupon
            if (couponInfo) {
                const coupon = await Coupon.findById(couponInfo);
                const newBooking = new Booking({
                    userInfo: req.user.id,
                    tourInfo,
                    couponInfo,
                    guestSize,
                    total: guestSize * tour.price * (100 - coupon.discountPercentage),
                });
                await newBooking.save();
                res.status(200).json({ success: true, message: 'Book Successful', data: savedBooking });
            } else {
                const newBooking = new Booking({
                    userInfo: req.user.id,
                    tourInfo,
                    couponInfo,
                    guestSize,
                    total: guestSize * tour.price,
                });
                const savedBooking = await newBooking.save();
                res.status(200).json({ success: true, message: 'Book Successful', data: savedBooking });
            }
        } else {
            res.status(400).json({ success: false, message: `You have an unpaid booking, you can't book more` });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const cancelBooking = async (req, res) => {
    const id = req.params.id;
    try {
        await Booking.findOneAndUpdate(
            {
                _id: id,
                userInfo: req.user.id,
            },
            {
                status: -1,
            },
            { new: true },
        );
        res.status(200).json({ success: true, message: 'Cancel Successful' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// get detail booking
export const getDetailBooking = async (req, res) => {
    const id = req.params.id;

    try {
        const book = await Booking.findById(id);

        res.status(200).json({ success: true, message: 'Successful', data: book });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

// get all booking
export const getAllBooking = async (req, res) => {
    try {
        if (req.user.role == 'user') {
            const books = await Booking.find({ userInfo: req.user.id })
                .populate('userInfo')
                .populate('tourInfo')
                .populate('couponInfo');

            res.status(200).json({ success: true, message: 'Successful', data: books });
        } else {
            const books = await Booking.find().populate('userInfo').populate('tourInfo').populate('couponInfo');
            res.status(200).json({ success: true, message: 'Successful', data: books });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
