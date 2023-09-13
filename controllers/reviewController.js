import Tour from '../models/Tour.js';
import Review from '../models/Review.js';
import User from '../models/User.js';

export const createReview = async (req, res) => {
    const id = req.params.id;
    const newReview = new Review({
        tourInfo: id,
        userInfo: req.user.id,
        comment: req.body.comment,
        rating: req.body.rating,
    });

    try {
        const savedReview = await newReview.save();
        res.status(200).json({ success: true, message: 'Đánh giá thành công', data: savedReview });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const getAllReviewById = async (req, res) => {
    const id = req.params.id;
    const page = parseInt(req.query.page) || 0;
    const rating = parseInt(req.query.rating);
    try {
        if (rating) {
            const reviews = await Review.find({ tourInfo: id, rating })
                .populate('tourInfo')
                .populate('userInfo')
                .sort({ createdAt: -1 })
                .skip(page * 5)
                .limit(5);
            const allReviews = await Review.find({ tourInfo: id, rating });
            res.status(200).json({ success: true, count: allReviews.length, data: reviews });
        } else {
            const reviews = await Review.find({ tourInfo: id })
                .populate('tourInfo')
                .populate('userInfo')
                .sort({ createdAt: -1 })
                .skip(page * 5)
                .limit(5);
            const allReviews = await Review.find({ tourInfo: id });
            res.status(200).json({ success: true, count: allReviews.length, data: reviews });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const get8LatestReview = async (req, res) => {
    try {
        const reviews = await Review.find({})
            .populate('tourInfo')
            .populate('userInfo')
            .sort({ createdAt: -1 })
            .limit(8);
        res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
