import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: true,
    },
    activities: {
      type: String,
      required: true,
    },
    meals: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

export default mongoose.model("Itinerary", itinerarySchema);
