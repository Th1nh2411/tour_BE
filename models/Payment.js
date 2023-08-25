import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userInfo: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    bookingInfo: {
      type: mongoose.Types.ObjectId,
      ref: "Booking",
    },
    paymentDate: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0
    },
    status: {
      type: Number,
      required: true,
      default: 0
    }
  },
  { timestamps: false }
);

export default mongoose.model("Payment", paymentSchema);
