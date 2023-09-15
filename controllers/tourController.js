import Tour from '../models/Tour.js';
import Category from '../models/Category.js';
import Guide from '../models/Guide.js';
import Review from '../models/Review.js';

//Create new tour
export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);

    try {
        const savedTour = await newTour.save();

        res.status(200).json({ success: true, message: 'Thêm mới thành công', data: savedTour });
    } catch (error) {
        res.status(500).json({ success: true, message: error.message });
    }
};

export const updateTour = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedTour = await Tour.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true },
        );

        res.status(200).json({ success: true, message: 'Cập nhật thành công', data: updatedTour });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//Getsingle Tour
export const getDetailTour = async (req, res) => {
    const id = req.params.id;
    try {
        const tour = await Tour.findById(id).lean().populate('guide').populate('category');
        const result = await Review.aggregate([
            { $match: { tourInfo: tour._id } }, // Lọc theo id tour
            { $group: { _id: '$tourId', averageRating: { $avg: '$rating' } } }, // Tính rating trung bình
        ]);
        if (result.length > 0) {
            tour.averageRating = Math.round(result[0].averageRating);
        } else {
            tour.averageRating = 0; // Nếu không có đánh giá, mặc định là 0
        }
        res.status(200).json({ success: true, data: tour });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//Get All Tour
export const getAllTour = async (req, res) => {
    //For pagination
    const page = parseInt(req.query.page);
    try {
        let tours = await Tour.find({})
            .populate('guide')
            .populate('category')
            .skip(page * 8)
            .limit(8)
            .lean()
            .exec();
        const updatedTours = await Promise.all(
            tours.map(async (tour) => {
                const result = await Review.aggregate([
                    { $match: { tourInfo: tour._id } }, // Lọc theo id tour
                    { $group: { _id: '$tourId', averageRating: { $avg: '$rating' } } }, // Tính rating trung bình
                ]);
                if (result.length > 0) {
                    tour.averageRating = Math.round(result[0].averageRating);
                } else {
                    tour.averageRating = 0; // Nếu không có đánh giá, mặc định là 0
                }
                return tour;
            }),
        );
        const allTours = await Tour.find({});
        res.status(200).json({ success: true, count: allTours.length, data: updatedTours });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getTourBySearch = async (req, res) => {
    const page = parseInt(req.query.page);
    const availableSeats = parseInt(req.query.availableSeats) || 1;
    const category = req.query.category;
    const minDuration = req.query.minDuration;
    const maxDuration = req.query.maxDuration;
    const keyword = new RegExp(req.query.keyword, 'i');
    let tours = {};
    let allTours = {};
    try {
        if (category) {
            if (keyword) {
                if (minDuration && maxDuration) {
                    tours = await Tour.find({
                        availableSeats: { $gte: availableSeats },
                        category,
                        duration: { $gte: minDuration, $lte: maxDuration },
                        $or: [{ tourName: keyword }, { address: keyword }],
                    })
                        .populate('guide')
                        .populate('category')
                        .lean()
                        .skip(page * 8)
                        .limit(8);
                    allTours = await Tour.find({
                        availableSeats: { $gte: availableSeats },
                        category,
                        duration: { $gte: minDuration, $lte: maxDuration },
                        $or: [{ tourName: keyword }, { address: keyword }],
                    });
                } else {
                    tours = await Tour.find({
                        availableSeats: { $gte: availableSeats },
                        category,
                        $or: [{ tourName: keyword }, { address: keyword }],
                    })
                        .populate('guide')
                        .populate('category')
                        .lean()
                        .skip(page * 8)
                        .limit(8);
                    allTours = await Tour.find({
                        availableSeats: { $gte: availableSeats },
                        category,
                        $or: [{ tourName: keyword }, { address: keyword }],
                    });
                }
            } else {
                if (minDuration && maxDuration) {
                    tours = await Tour.find({
                        availableSeats: { $gte: availableSeats },
                        duration: { $gte: minDuration, $lte: maxDuration },
                        category,
                    })
                        .populate('guide')
                        .populate('category')
                        .lean()
                        .skip(page * 8)
                        .limit(8);
                    allTours = await Tour.find({
                        availableSeats: { $gte: availableSeats },
                        duration: { $gte: minDuration, $lte: maxDuration },
                        category,
                    });
                } else {
                    tours = await Tour.find({ availableSeats: { $gte: availableSeats }, category })
                        .populate('guide')
                        .populate('category')
                        .lean()
                        .skip(page * 8)
                        .limit(8);
                    allTours = await Tour.find({ availableSeats: { $gte: availableSeats }, category });
                }
            }
        } else {
            if (keyword) {
                if (minDuration && maxDuration) {
                    tours = await Tour.find({
                        availableSeats: { $gte: availableSeats },
                        duration: { $gte: minDuration, $lte: maxDuration },
                        $or: [{ tourName: keyword }, { address: keyword }],
                    })
                        .populate('guide')
                        .populate('category')
                        .lean()
                        .skip(page * 8)
                        .limit(8);
                    allTours = await Tour.find({
                        availableSeats: { $gte: availableSeats },
                        duration: { $gte: minDuration, $lte: maxDuration },
                        $or: [{ tourName: keyword }, { address: keyword }],
                    });
                } else {
                    tours = await Tour.find({
                        availableSeats: { $gte: availableSeats },
                        $or: [{ tourName: keyword }, { address: keyword }],
                    })
                        .populate('guide')
                        .populate('category')
                        .lean()
                        .skip(page * 8)
                        .limit(8);
                    allTours = await Tour.find({
                        availableSeats: { $gte: availableSeats },
                        $or: [{ tourName: keyword }, { address: keyword }],
                    });
                }
            } else {
                if (minDuration && maxDuration) {
                    tours = await Tour.find({
                        availableSeats: { $gte: availableSeats },
                        duration: { $gte: minDuration, $lte: maxDuration },
                    })
                        .populate('guide')
                        .populate('category')
                        .lean()
                        .skip(page * 8)
                        .limit(8);
                    allTours = await Tour.find({
                        availableSeats: { $gte: availableSeats },
                        duration: { $gte: minDuration, $lte: maxDuration },
                    });
                } else {
                    tours = await Tour.find({
                        availableSeats: { $gte: availableSeats },
                    })
                        .populate('guide')
                        .populate('category')
                        .lean()
                        .skip(page * 8)
                        .limit(8);
                    allTours = await Tour.find({
                        availableSeats: { $gte: availableSeats },
                    });
                }
            }
        }

        const updatedTours = await Promise.all(
            tours.map(async (tour) => {
                const result = await Review.aggregate([
                    { $match: { tourInfo: tour._id } }, // Lọc theo id tour
                    { $group: { _id: '$tourId', averageRating: { $avg: '$rating' } } }, // Tính rating trung bình
                ]);
                if (result.length > 0) {
                    tour.averageRating = Math.round(result[0].averageRating);
                } else {
                    tour.averageRating = 0; // Nếu không có đánh giá, mặc định là 0
                }
                return tour;
            }),
        );
        res.status(200).json({ success: true, count: allTours.length, data: updatedTours });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getFeaturedTour = async (req, res) => {
    try {
        const tours = await Tour.find({ featured: true }).lean().populate('guide').populate('category').limit(8);
        const updatedTours = await Promise.all(
            tours.map(async (tour) => {
                const result = await Review.aggregate([
                    { $match: { tourInfo: tour._id } }, // Lọc theo id tour
                    { $group: { _id: '$tourId', averageRating: { $avg: '$rating' } } }, // Tính rating trung bình
                ]);
                if (result.length > 0) {
                    tour.averageRating = Math.round(result[0].averageRating);
                } else {
                    tour.averageRating = 0; // Nếu không có đánh giá, mặc định là 0
                }
                return tour;
            }),
        );
        res.status(200).json({ success: true, data: updatedTours });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
