import Booking from '../models/Booking.js';
import Tour from '../models/Tour.js';
import User from '../models/User.js';

// create new booking
export const createBooking = async (req, res) => {
    const { tourInfo, guestSize } = req.body;
    try {
        const check = await Booking.findOne({
            tourInfo,
            status: 0,
        });
        if (!check) {
            const tour = await Tour.findById(tourInfo);
            if (tour.availableSeats < guestSize) {
                res.status(400).json({ success: false, message: 'Available seats are not enough' });
            } else {
                const user = await User.findById(req.user.id);
                const count = await Booking.countDocuments({ userInfo: req.user.id, status: 2 });
                if (user.rank == 0) {
                    const newBooking = new Booking({
                        userInfo: req.user.id,
                        tourInfo,
                        guestSize,
                        startDate: tour.startDate,
                        endDate: tour.endDate,
                        total: guestSize * tour.price,
                    });
                    await newBooking.save();
                    if (count == 3) {
                        await User.findByIdAndUpdate(
                            req.user.id,
                            {
                                rank: 1,
                            },
                            { new: true },
                        );
                    }
                    if (count == 5) {
                        await User.findByIdAndUpdate(
                            req.user.id,
                            {
                                rank: 2,
                            },
                            { new: true },
                        );
                    }
                    if (count == 10) {
                        await User.findByIdAndUpdate(
                            req.user.id,
                            {
                                rank: 3,
                            },
                            { new: true },
                        );
                    }
                    res.status(200).json({ success: true, message: 'Book Successful' });
                } else if (user.rank == 1) {
                    const newBooking = new Booking({
                        userInfo: req.user.id,
                        tourInfo,
                        guestSize,
                        startDate: tour.startDate,
                        endDate: tour.endDate,
                        total: guestSize * tour.price * 0.95,
                    });
                    await newBooking.save();
                    if (count == 3) {
                        await User.findByIdAndUpdate(
                            req.user.id,
                            {
                                rank: 1,
                            },
                            { new: true },
                        );
                    }
                    if (count == 5) {
                        await User.findByIdAndUpdate(
                            req.user.id,
                            {
                                rank: 2,
                            },
                            { new: true },
                        );
                    }
                    if (count == 10) {
                        await User.findByIdAndUpdate(
                            req.user.id,
                            {
                                rank: 3,
                            },
                            { new: true },
                        );
                    }
                    res.status(200).json({
                        success: true,
                        message: 'Book Successful. Your rank is brozen, you get 5% off',
                    });
                } else if (user.rank == 2) {
                    const newBooking = new Booking({
                        userInfo: req.user.id,
                        tourInfo,
                        guestSize,
                        startDate: tour.startDate,
                        endDate: tour.endDate,
                        total: guestSize * tour.price * 0.9,
                    });
                    await newBooking.save();
                    if (count == 3) {
                        await User.findByIdAndUpdate(
                            req.user.id,
                            {
                                rank: 1,
                            },
                            { new: true },
                        );
                    }
                    if (count == 5) {
                        await User.findByIdAndUpdate(
                            req.user.id,
                            {
                                rank: 2,
                            },
                            { new: true },
                        );
                    }
                    if (count == 10) {
                        await User.findByIdAndUpdate(
                            req.user.id,
                            {
                                rank: 3,
                            },
                            { new: true },
                        );
                    }
                    res.status(200).json({
                        success: true,
                        message: 'Book Successful. Your rank is silver, you get 10% off',
                    });
                } else {
                    const newBooking = new Booking({
                        userInfo: req.user.id,
                        tourInfo,
                        guestSize,
                        startDate: tour.startDate,
                        endDate: tour.endDate,
                        total: guestSize * tour.price * 0.85,
                    });
                    await newBooking.save();
                    if (count == 3) {
                        await User.findByIdAndUpdate(
                            req.user.id,
                            {
                                rank: 1,
                            },
                            { new: true },
                        );
                    }
                    if (count == 5) {
                        await User.findByIdAndUpdate(
                            req.user.id,
                            {
                                rank: 2,
                            },
                            { new: true },
                        );
                    }
                    if (count == 10) {
                        await User.findByIdAndUpdate(
                            req.user.id,
                            {
                                rank: 3,
                            },
                            { new: true },
                        );
                    }
                    res.status(200).json({
                        success: true,
                        message: 'Book Successful. Your rank is gold, you get 15% off',
                    });
                }
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
        const count = await Booking.countDocuments({ userInfo: req.user.id, status: 2 });
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
        if (count == 2) {
            await User.findByIdAndUpdate(
                req.user.id,
                {
                    rank: 0,
                },
                { new: true },
            );
        }
        if (count == 4) {
            await User.findByIdAndUpdate(
                req.user.id,
                {
                    rank: 1,
                },
                { new: true },
            );
        }
        if (count == 9) {
            await User.findByIdAndUpdate(
                req.user.id,
                {
                    rank: 2,
                },
                { new: true },
            );
        }
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
            const books = await Booking.find({ userInfo: req.user.id }).populate('userInfo').populate('tourInfo');

            res.status(200).json({ success: true, message: 'Successful', data: books });
        } else {
            const books = await Booking.find().populate('userInfo').populate('tourInfo');
            res.status(200).json({ success: true, message: 'Successful', data: books });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
