import User from "./models/User.js";
import Booking from "./models/Booking.js";
import Category from "./models/Category.js";
import Coupon from "./models/Coupon.js";
import Guide from "./models/Guide.js";
import Itinerary from "./models/Itinerary.js";
import Payment from "./models/Payment.js";
import Rating from "./models/Rating.js";
import Review from "./models/Review.js";
import Tour from "./models/Tour.js";
import mongoose from "mongoose";
import Wishlist from "./models/Wishlist.js";

async function seed() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(
      "mongodb+srv://rinktvn2525:0905138221thinh@cluster0.dpawfmv.mongodb.net/tours_booking?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    await User.createCollection()
      .then(() => {
        console.log("User collection created");
      })
      .catch((err) => {
        console.error("Error creating User collection:", err);
      });

    await Booking.createCollection()
      .then(() => {
        console.log("Booking collection created");
      })
      .catch((err) => {
        console.error("Error creating Booking collection:", err);
      });

    await Category.createCollection()
      .then(() => {
        console.log("Category collection created");
      })
      .catch((err) => {
        console.error("Error creating Category collection:", err);
      });

    await Coupon.createCollection()
      .then(() => {
        console.log("Coupon collection created");
      })
      .catch((err) => {
        console.error("Error creating Coupon collection:", err);
      });

    await Guide.createCollection()
      .then(() => {
        console.log("Guide collection created");
      })
      .catch((err) => {
        console.error("Error creating Guide collection:", err);
      });

    await Itinerary.createCollection()
      .then(() => {
        console.log("Itinerary collection created");
      })
      .catch((err) => {
        console.error("Error creating Itinerary collection:", err);
      });

    await Payment.createCollection()
      .then(() => {
        console.log("Payment collection created");
      })
      .catch((err) => {
        console.error("Error creating Payment collection:", err);
      });

    await Rating.createCollection()
      .then(() => {
        console.log("Rating collection created");
      })
      .catch((err) => {
        console.error("Error creating Rating collection:", err);
      });

    await Review.createCollection()
      .then(() => {
        console.log("Review collection created");
      })
      .catch((err) => {
        console.error("Error creating Review collection:", err);
      });

    await Tour.createCollection()
      .then(() => {
        console.log("Tour collection created");
      })
      .catch((err) => {
        console.error("Error creating Tour collection:", err);
      });
    await Wishlist.createCollection()
      .then(() => {
        console.log("Wishlist collection created");
      })
      .catch((err) => {
        console.error("Error creating Wishlist collection:", err);
      });
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Đóng kết nối tới MongoDB sau khi hoàn thành seed
    mongoose.disconnect();
  }
}

seed();
