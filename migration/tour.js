import Review from "../models/Review.js";
import Tour from "../models/Tour.js";
import mongoose from "mongoose";
import Wishlist from "../models/Wishlist.js";

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
      const categoryData = [
        {
          categoryName: "Tour Du lịch",
          description:
            "Loại tour này bao gồm các hoạt động mạo hiểm và phiêu lưu như leo núi, đi bộ đường dài, leo tường đá, nhảy dù và trải nghiệm thác nước. Phù hợp cho những người muốn tìm kiếm những trải nghiệm ngoài trời mạo hiểm.",
        },
        {
          categoryName: "Tour Văn Hóa",
          description:
            "Loại tour này tập trung vào việc giúp du khách thấm nhuần vào di sản văn hóa, truyền thống của một điểm đến cụ thể. Tour có thể bao gồm viếng thăm các di tích lịch sử, bảo tàng, tham quan chợ địa phương, xem các màn biểu diễn truyền thống và tương tác với cộng đồng địa phương.",
        },
        {
          categoryName: "Tour Biển",
          description:
            "Loại tour này cung cấp các tour đến các điểm đến ven biển với những bãi biển đẹp. Du khách có thể tắm nắng, bơi, lặn biển, tham gia các môn thể thao dưới nước và thư giãn cạnh biển. Tour này rất phù hợp cho những người yêu biển và muốn có một kỳ nghỉ thư giãn.",
        },
        {
          categoryName: "Tour Du Lịch Thiên Nhiên",
          description:
            "Loại tour này tập trung vào việc khám phá và bảo tồn thiên nhiên hoang dã. Du khách có thể tham gia vào các tour đi săn hoang dã tại các công viên quốc gia hoặc khu bảo tồn để quan sát và tìm hiểu về các loài động vật hoang dã. Có thể bao gồm cả những cuộc đi bộ đường dài và việc quan sát chim.",
        },
        {
          categoryName: "Tour Ẩm Thực và Rượu Vang",
          description:
            "Loại tour này xoay quanh trải nghiệm văn hóa ẩm thực, cho du khách thỏa mãn khẩu vị thông qua việc thưởng thức các món ăn địa phương, thăm chợ địa phương, tham gia các lớp học nấu ăn, thưởng thức rượu vang và thăm các trang trại. Đây là loại tour lý tưởng cho những người yêu thích ẩm thực và muốn khám phá các hương vị và truyền thống ẩm thực khác nhau.",
        },
      ];
      await Category.insertMany(categoryData);
  
  
      await Coupon.createCollection()
        .then(() => {
          console.log("Coupon collection created");
        })
        .catch((err) => {
          console.error("Error creating Coupon collection:", err);
        });
        const couponData = [
          {
            couponCode: "SUMMER2023",
            discountPercentage: "15",
            validUntil: "2023-09-25",
          },
          {
            couponCode: "SALE10",
            discountPercentage: "10",
            validUntil: "2023-09-25",
          },
          {
            couponCode: "HOLIDAY20",
            discountPercentage: "20",
            validUntil: "2023-09-25",
          },
          {
            couponCode: "FALL25",
            discountPercentage: "25",
            validUntil: "2023-09-25",
          },
          {
            couponCode: "WELCOME15",
            discountPercentage: "15",
            validUntil: "2023-09-25",
          },
        ];
        await Coupon.insertMany(couponData);
      
  
      await Guide.createCollection()
        .then(() => {
          console.log("Guide collection created");
        })
        .catch((err) => {
          console.error("Error creating Guide collection:", err);
        });
      const guideData = [
        {
          guideName: "Nguyễn Minh Tú",
          email: "nguyenminhtu@gmail.com",
          phoneNumber: "0845444999",
          languages: "Tiếng Anh, Tiếng Pháp",
        },
        {
          guideName: "Trần Hoàng Long",
          email: "tranhoanglong@gmail.com",
          phoneNumber: "0972777123",
          languages: "Tiếng Trung, Tiếng Pháp",
        },
        {
          guideName: "Trương Phạm Trí Cường",
          email: "cuongtruong@gmail.com",
          phoneNumber: "0762151251",
          languages: "Tiếng Hàn, Tiếng Nhật",
        },
      ];
      await Guide.insertMany(guideData);
  
  
      await Itinerary.createCollection()
        .then(() => {
          console.log("Itinerary collection created");
        })
        .catch((err) => {
          console.error("Error creating Itinerary collection:", err);
        });
  
      const itineraryData = [
        {
          day: 5,
          activities:
            "Tham quan danh lam thắng cảnh, leo núi, đi bộ đường dài, tham gia trò chơi mạo hiểm, thăm các ngôi đền và chùa.",
          meals: "Bữa sáng, bữa trưa, bữa tối",
        },
        {
          day: 3,
          activities:
            "Thưởng thức các hoạt động ven biển như bơi, lặn biển, đi thuyền kayak, tắm nắng, tham gia trò chơi trên cát.",
          meals: "Bữa sáng, bữa trưa",
        },
        {
          day: 7,
          activities:
            "Khám phá di tích văn hóa, tham quan bảo tàng, tham gia lễ hội địa phương, tham quan thị trấn cổ, tham gia các lớp học nấu ăn địa phương.",
          meals: "Bữa sáng, bữa trưa, bữa tối, thử nếm ẩm thực địa phương",
        },
        {
          day: 2,
          activities:
            "Khám phá thành phố, tham gia tour đi bộ do hướng dẫn viên, thăm các chợ địa phương, thưởng thức đặc sản và mua sắm hàng lưu niệm.",
          meals: "Bữa sáng, bữa trưa",
        },
        {
          day: 4,
          activities:
            "Tham gia safari quan sát động vật hoang dã, tham gia các cuộc đi bộ ngắm cảnh trong rừng, tham gia buổi tối xem vũ điệu dân gian và thưởng thức nước trái cây tươi ngon.",
          meals: "Bữa sáng, bữa trưa, bữa tối, BBQ trại lửa",
        },
      ];
      await Itinerary.insertMany(itineraryData);
  
  
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
  