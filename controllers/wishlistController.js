import Wishlist from '../models/Wishlist.js';
import Tour from '../models/Tour.js';

// create new booking
export const createTourToWishlist = async (req, res) => {
    try {
        const item = await Wishlist.findOne({
            tourInfo: req.params.id,
            userInfo: req.user.id,
        });
        if (item) {
            await Wishlist.findOneAndDelete({
                tourInfo: req.params.id,
                userInfo: req.user.id,
            });
            res.status(200).json({ success: true, message: 'Removed from wishlist successfully' });
        } else {
            const newWishlist = new Wishlist({
                tourInfo: req.params.id,
                userInfo: req.user.id,
            });
            await newWishlist.save();
            res.status(200).json({ success: true, message: 'Successfully added to wishlist' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllTourInWishlist = async (req, res) => {
    try {
        const items = await Wishlist.find({ userInfo: req.user.id }).populate('tourInfo');
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
