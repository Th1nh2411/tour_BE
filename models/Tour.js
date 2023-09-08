import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema(
    {
        category: {
            type: mongoose.Types.ObjectId,
            ref: 'Category',
        },
        guide: {
            type: mongoose.Types.ObjectId,
            ref: 'Guide',
        },
        itineraries: {
            type: Array,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        tourName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        photo: {
            type: String,
            default: 'http://res.cloudinary.com/dpgjnngzt/image/upload/v1693155640/download_on0pyo.jpg',
        },
        price: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
            default: 0,
        },
        availableSeats: {
            type: Number,
            required: true,
            min: 0,
            max: 50,
        },
        maxSeats: {
            type: Number,
            required: true,
            min: 10,
            max: 50,
        },
        status: {
            type: Number,
            default: 1,
        },
        featured: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: false },
);

export default mongoose.model('Tour', tourSchema);
