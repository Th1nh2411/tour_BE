import mongoose from "mongoose";

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
      createAt: {
         type: Date,
         required: true
      },
   },
   { timestamps: false }
);

export default mongoose.model("Booking", bookingSchema);
