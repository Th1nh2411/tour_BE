import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    userInfo: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    guideInfo: {
        type: mongoose.Types.ObjectId,
        ref: "Tour",
    },
    comment: {
      type: String,
    },
    createAt: {
      type: Date,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: false }
);

export default mongoose.model("Rating", wishlistSchema);
