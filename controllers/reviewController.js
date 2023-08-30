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
        res.status(200).json({ success: true, message: 'Review submitted', data: savedReview });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const getAllReviewById = async (req, res) => {
    const id = req.params.id;
    try {
        const reviews = await Review.find({ tourInfo: id }).populate('tourInfo').populate('userInfo');

        res.status(200).json({ success: true, message: 'Successfully', data: reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
