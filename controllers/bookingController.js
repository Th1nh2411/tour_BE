import Booking from '../models/Booking.js';
import Tour from '../models/Tour.js';
import User from '../models/User.js';

// create new booking
export const createBooking = async (req, res) => {
    const { tourInfo, guestSize } = req.body;
    try {
        const tour = await Tour.findById(tourInfo);
        if (tour.availableSeats < guestSize) {
            res.status(400).json({ success: false, message: 'Số lượng chỗ ngồi còn lại không đủ' });
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
                res.status(200).json({ success: true, message: 'Đặt tour thành công', data: newBooking });
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
                    message: 'Đặt tour thành công. Hạng của bạn là Đồng, bạn được giảm 5%',
                    data: newBooking,
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
                    message: 'Đặt tour thành công. Hạng của bạn là Bạc, bạn được giảm 10%',
                    data: newBooking,
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
                    message: 'Đặt tour thành công. Hạng của bạn là Vàng, bạn được giảm 15%',
                    data: newBooking,
                });
            }
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const checkBooking = async (req, res) => {
    try {
        const check = await Booking.findOne({
            userInfo: req.user.id,
            $or: [{ status: 1 }, { status: 0 }],
        });
        res.status(200).json({ success: true, data: check });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const cancelBooking = async (req, res) => {
    const id = req.params.id;
    try {
        const booking = await Booking.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $set: { status: -1 },
            },
            { new: true },
        );
        if (booking.status != 0) {
            await Tour.findOneAndUpdate(
                {
                    _id: booking.tourInfo,
                },
                {
                    $inc: { availableSeats: +booking.guestSize },
                },
                { new: true },
            );
        }
        const count = await Booking.countDocuments({ userInfo: req.user.id, status: 2 });
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
        res.status(200).json({ success: true, message: 'Huỷ tour thành công' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// get detail booking
export const getDetailBooking = async (req, res) => {
    const id = req.params.id;

    try {
        const book = await Booking.findById(id);

        res.status(200).json({ success: true, data: book });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

// get all booking
export const getAllBooking = async (req, res) => {
    try {
        if (req.user.role == 'user') {
            const books = await Booking.find({ userInfo: req.user.id }).populate('userInfo').populate('tourInfo');

            res.status(200).json({ success: true, data: books });
        } else {
            const books = await Booking.find().populate('userInfo').populate('tourInfo');
            res.status(200).json({ success: true, data: books });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

async function checkAndDeleteExpiredBooking() {
    const now = new Date();
    now.setHours(now.getHours() + 7);
    const bookingList = await Booking.find({
        status: 0,
    });
    if (bookingList) {
        for (let i = 0; i < bookingList.length; i++) {
            if (bookingList.expiredAt <= now) {
                await Booking.findOneAndDelete(bookingList[i]._id);
            }
        }
    }
}

setInterval(checkAndDeleteExpiredBooking, 60000);
