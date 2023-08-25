import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    reviews: {
      type: mongoose.Types.ObjectId,
      ref: "Review",
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    itineraries: {
      type: mongoose.Types.ObjectId,
      ref: "Itinerary",
    },
    guide: {
      type: mongoose.Types.ObjectId,
      ref: "Guide",
    },
    tourName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
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
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
    maxSeats: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: false }
);

export default mongoose.model("Tour", tourSchema);
