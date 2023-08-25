import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    userInfo: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    tourInfo: {
        type: mongoose.Types.ObjectId,
        ref: "Tour",
      },
    createAt: {
        type: Date,
        require: true
    },
  },
  { timestamps: false }
);

export default mongoose.model("Wishlist", wishlistSchema);
