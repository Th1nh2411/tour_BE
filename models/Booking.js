import mongoose from "mongoose";
const date = new Date();
date.setHours(date.getHours() + 7);

const bookingSchema = new mongoose.Schema(
   {
      userInfo: {
         type: mongoose.Types.ObjectId,
         ref: "User",
       },
       tourInfo: {
         type: mongoose.Types.ObjectId,
         ref: "Tour",
       },
       couponInfo: {
         type: mongoose.Types.ObjectId,
         ref: "Coupon",
       },
      guestSize: {
         type: Number,
         required: true
      },
      total: {
         type: Number,
         required: true
      },
      createAt: {
         type: Date,
         required: true,
         default: date
      },
      status: {
         type: Number,
         required: true,
         default: 0
      },
   },
   { timestamps: false }
);

export default mongoose.model("Booking", bookingSchema);
