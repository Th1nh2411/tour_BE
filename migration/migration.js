import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Category from '../models/Category.js';
import Guide from '../models/Guide.js';
import Payment from '../models/Payment.js';
import Review from '../models/Review.js';
import Tour from '../models/Tour.js';
import Wishlist from '../models/Wishlist.js';
import Feedback from '../models/Feedback.js';
import Message from '../models/Message.js';
import Chat from '../models/Chat.js';
import mongoose from 'mongoose';

async function seed() {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(
            'mongodb+srv://rinktvn2525:0905138221thinh@cluster0.dpawfmv.mongodb.net/tours_booking?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        );
        await UserTemp.createCollection()
            .then(() => {
                console.log('UserTemp collection created');
            })
            .catch((err) => {
                console.error('Error creating UserTemp collection:', err);
            });
        await User.createCollection()
            .then(() => {
                console.log('User collection created');
            })
            .catch((err) => {
                console.error('Error creating User collection:', err);
            });
        const userData = [
            {
                _id: '6153f2e39c6c9bdf49ec1f87',
                username: 'user1',
                email: 'phammanhbeo2001@gmail.com',
                password: '$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW',
                fullName: 'Phạm Minh Mạnh',
                photo: 'https://khoinguonsangtao.vn/wp-content/uploads/2022/11/hinh-anh-avatar-nam-ca-tinh-nguoi-that.jpg',
                phoneNumber: '0961592551',
                address: 'Quang Trung, Thống Nhất, Đồng Nai',
            },
            {
                _id: '6153f2e39c6c9bdf49ec1f88',
                username: 'user2',
                email: 'ducthinh@gmail.com',
                password: '$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW',
                photo: 'https://antimatter.vn/wp-content/uploads/2022/04/avatar-doi-nguoi-that-ngau-cho-nam.jpg',
                fullName: 'Nguyễn Đức Thịnh',
                phoneNumber: '0966666566',
                address: 'Kontum',
            },
            {
                _id: '6153f2e39c6c9bdf49ec1f91',
                username: 'user3',
                email: 'duchau@gmail.com',
                password: '$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW',
                photo: 'https://toigingiuvedep.vn/wp-content/uploads/2021/05/anh-avatar-hot-boy.jpg',
                fullName: 'Đỗ Đức Hậu',
                phoneNumber: '0966664566',
                address: 'Kontum',
            },
            {
                _id: '6153f2e39c6c9bdf49ec1f92',
                username: 'user4',
                email: 'nhatquan@gmail.com',
                password: '$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW',
                fullName: 'Trần Nhật Quân',
                photo: 'https://anhdep123.com/wp-content/uploads/2021/01/trai-dep-ngau.jpg',
                phoneNumber: '0966266566',
                address: 'Hải Dương',
            },
            {
                _id: '6153f2e39c6c9bdf49ec1f93',
                username: 'user5',
                email: 'thihong@gmail.com',
                password: '$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW',
                fullName: 'Nguyễn Thị Hồng',
                photo: 'https://luv.vn/wp-content/uploads/2021/11/avatar-gai-xinh-73.jpg',
                phoneNumber: '0966266566',
                address: 'Hải Dương',
            },
            {
                _id: '6153f2e39c6c9bdf49ec1f94',
                username: 'user6',
                email: 'thanhhien@gmail.com',
                password: '$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW',
                fullName: 'Nguyễn Thị Thanh Hiền',
                photo: 'https://meliawedding.com.vn/wp-content/uploads/2022/03/avatar-gai-xinh-49.jpg',
                phoneNumber: '0964566566',
                address: 'Đồng Nai',
            },
            {
                _id: '6153f2e39c6c9bdf49ec1f95',
                username: 'user7',
                email: 'thanhthao@gmail.com',
                password: '$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW',
                fullName: 'Nguyễn Thị Thanh Thảo',
                photo: 'https://pgddakglong.edu.vn/wp-content/uploads/2023/04/anh-gai-xinh-lam-anh-dai-dien-facebook1-1.jpg',
                phoneNumber: '0967566566',
                address: 'Đồng Nai',
            },
            {
                _id: '6153f2e39c6c9bdf49ec1f89',
                username: 'admin',
                email: 'ducthinh123@gmail.com',
                password: '$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW',
                fullName: 'Trần Văn Mạnh',
                phoneNumber: '096666666',
                address: 'Kontum',
                role: 'admin',
            },
        ];
        await User.insertMany(userData);

        await Category.createCollection()
            .then(() => {
                console.log('Category collection created');
            })
            .catch((err) => {
                console.error('Error creating Category collection:', err);
            });
        const categoryData = [
            {
                _id: '6153f2e39c6c9bdf49ec1c87',
                categoryName: 'Tour Du lịch',
                description:
                    'Loại tour này bao gồm các hoạt động mạo hiểm và phiêu lưu như leo núi, đi bộ đường dài, leo tường đá, nhảy dù và trải nghiệm thác nước. Phù hợp cho những người muốn tìm kiếm những trải nghiệm ngoài trời mạo hiểm.',
            },
            {
                _id: '6153f2e39c6c9bdf49ec1c88',
                categoryName: 'Tour Văn Hóa',
                description:
                    'Loại tour này tập trung vào việc giúp du khách thấm nhuần vào di sản văn hóa, truyền thống của một điểm đến cụ thể. Tour có thể bao gồm viếng thăm các di tích lịch sử, bảo tàng, tham quan chợ địa phương, xem các màn biểu diễn truyền thống và tương tác với cộng đồng địa phương.',
            },
            {
                _id: '6153f2e39c6c9bdf49ec1c89',
                categoryName: 'Tour Biển',
                description:
                    'Loại tour này cung cấp các tour đến các điểm đến ven biển với những bãi biển đẹp. Du khách có thể tắm nắng, bơi, lặn biển, tham gia các môn thể thao dưới nước và thư giãn cạnh biển. Tour này rất phù hợp cho những người yêu biển và muốn có một kỳ nghỉ thư giãn.',
            },
            {
                _id: '6153f2e39c6c9bdf49ec1c90',
                categoryName: 'Tour Du Lịch Thiên Nhiên',
                description:
                    'Loại tour này tập trung vào việc khám phá và bảo tồn thiên nhiên hoang dã. Du khách có thể tham gia vào các tour đi săn hoang dã tại các công viên quốc gia hoặc khu bảo tồn để quan sát và tìm hiểu về các loài động vật hoang dã. Có thể bao gồm cả những cuộc đi bộ đường dài và việc quan sát chim.',
            },
            {
                _id: '6153f2e39c6c9bdf49ec1c91',
                categoryName: 'Tour Ẩm Thực và Rượu Vang',
                description:
                    'Loại tour này xoay quanh trải nghiệm văn hóa ẩm thực, cho du khách thỏa mãn khẩu vị thông qua việc thưởng thức các món ăn địa phương, thăm chợ địa phương, tham gia các lớp học nấu ăn, thưởng thức rượu vang và thăm các trang trại. Đây là loại tour lý tưởng cho những người yêu thích ẩm thực và muốn khám phá các hương vị và truyền thống ẩm thực khác nhau.',
            },
        ];
        await Category.insertMany(categoryData);

        await Guide.createCollection()
            .then(() => {
                console.log('Guide collection created');
            })
            .catch((err) => {
                console.error('Error creating Guide collection:', err);
            });
        const guideData = [
            {
                _id: '6153f2e39c6c9bdf49ec1e01',
                guideName: 'Nguyễn Minh Tú',
                photo: 'https://www.cakeresume.com/cdn-cgi/image/fit=scale-down,format=auto,w=1200/https://images.cakeresume.com/images/cf8fab08-2298-4808-9f81-5ea2528c9671.jpg',
                email: 'nguyenminhtu@gmail.com',
                phoneNumber: '0845444999',
                languages: 'Tiếng Anh, Tiếng Pháp',
                description:
                    'Xin chào! Tôi là Hướng dẫn viên Nguyễn Minh Tú, chuyên về du lịch văn hóa và lịch sử. Với hơn 10 năm kinh nghiệm, tôi đã có cơ hội hướng dẫn khách du lịch đến các điểm tham quan nổi tiếng trên toàn thế giới. Tôi sẽ đưa bạn trở về quá khứ để khám phá những câu chuyện thú vị về di sản văn hóa và lịch sử của mỗi địa điểm. Tôi tin rằng sự hiểu biết về quá khứ sẽ giúp bạn có cái nhìn đầy sáng tạo về hiện tại. Hãy để tôi làm người dẫn lối trong hành trình khám phá văn hóa và lịch sử này!',
            },
            {
                _id: '6153f2e39c6c9bdf49ec1e02',
                guideName: 'Trần Hoàng Long',
                photo: 'https://images.careerbuilder.vn/content/news/01BinhMKT/news/20180122.jpg',
                email: 'tranhoanglong@gmail.com',
                phoneNumber: '0972777123',
                languages: 'Tiếng Trung, Tiếng Pháp',
                description:
                    'Xin chào! Tôi là Hướng dẫn viên Trần Hoàng Long, chuyên về du lịch thể thao và phong cảnh. Nếu bạn yêu thích sự mạo hiểm và muốn khám phá những vùng đất hoang dã, tôi sẽ là người dẫn đường tốt nhất cho bạn. Với kinh nghiệm tham gia nhiều hoạt động như leo núi, đi xe đạp địa hình và trượt tuyết, tôi sẽ đưa bạn đến những ngọn núi cao, những hang động huyền bí và những bãi biển hoang sơ. Hãy chuẩn bị bỏ túi những trải nghiệm thú vị cùng tôi!',
            },
            {
                _id: '6153f2e39c6c9bdf49ec1e03',
                guideName: 'Trương Phạm Trí Cường',
                photo: 'https://www.chuphinhsanpham.vn/wp-content/uploads/2022/02/chup-hinh-cv-profile-hcm-0004.jpg',
                email: 'cuongtruong@gmail.com',
                phoneNumber: '0762151251',
                languages: 'Tiếng Hàn, Tiếng Nhật',
                description:
                    'Xin chào! Tôi là Hướng dẫn viên Trương Phạm Trí Cường, sẵn sàng đưa bạn trở thành một du khách thực sự trong hành trình khám phá ẩm thực. Với tôi, ẩm thực không chỉ là việc thưởng thức những món ngon đặc sản địa phương, mà còn là cách để hiểu sâu sắc văn hóa và con người của mỗi nơi bạn đến. Tôi sẽ dẫn bạn đến những chợ địa phương, những nhà hàng nổi tiếng và tham gia trực tiếp vào quá trình chuẩn bị món ăn. Cùng tôi, bạn sẽ có trải nghiệm gợi mở mọi giác quan và tìm hiểu về những bí quyết của ẩm thực địa phương. Hãy chuẩn bị bụng và tinh thần để cùng tôi khám phá văn hóa đa dạng của ẩm thực!',
            },
        ];
        await Guide.insertMany(guideData);

        await Tour.createCollection()
            .then(() => {
                console.log('Tour collection created');
            })
            .catch((err) => {
                console.error('Error creating Tour collection:', err);
            });
        const tourData = [
            {
                _id: '64eb92c8f0787b66f2d65ecd',
                category: '6153f2e39c6c9bdf49ec1c90',
                guide: '6153f2e39c6c9bdf49ec1e01',
                address: 'Việt Nam',
                itineraries: [
                    'Ngày 1: Tiếp cận hang động',
                    'Ngày 2: Thám hiểm hang động',
                    'Ngày 3: Khám phá hệ sinh thái hang động',
                ],
                tourName: 'Khám phá hang động Sơn Đoòng',
                description:
                    'Hành trình phiêu lưu đến hang động lớn nhất thế giới và khám phá cảnh quan kỳ vĩ bên trong.',
                duration: 3,
                photo: 'http://res.cloudinary.com/dpgjnngzt/image/upload/v1693155640/download_on0pyo.jpg',
                price: '5000000',
                availableSeats: 10,
                maxSeats: 10,
                startDate: '2023-10-30',
                endDate: '2023-12-30',
            },
            {
                _id: '64eb92c8f0787b66f2d65ece',
                category: '6153f2e39c6c9bdf49ec1c90',
                guide: '6153f2e39c6c9bdf49ec1e02',
                itineraries: [
                    'Ngày 1: Điều khiển xe jeep qua công viên',
                    'Ngày 2: Theo dõi đàn sư tử',
                    'Ngày 3: Gặp gỡ các loài động vật hoang dã',
                ],
                address: 'Châu phi',
                tourName: 'Safari phiêu lưu ở Serengeti',
                description:
                    'Trải nghiệm cuộc sống hoang dã và theo dõi các con vật trong môi trường tự nhiên của công viên quốc gia Serengeti.',
                duration: 3,
                photo: 'http://res.cloudinary.com/dpgjnngzt/image/upload/v1693155678/Di_safari_o_Tanzania_06_rim0uv.jpg',
                price: '12000000',
                availableSeats: 10,
                maxSeats: 10,
                startDate: '2023-10-30',
                endDate: '2023-12-30',
            },
            {
                _id: '64eb92c8f0787b66f2d65ecf',
                category: '6153f2e39c6c9bdf49ec1c90',
                guide: '6153f2e39c6c9bdf49ec1e03',
                itineraries: ['Ngày 1: Chu du đảo san hô', 'Ngày 2: Lặn biển sâu', 'Ngày 3: Khám phá sinh vật biển'],
                address: 'Cộng hòa Maldives',
                tourName: 'Khám phá dưới lòng biển Maldives',
                description: 'Trải nghiệm cuộc sống biển và khám phá vẻ đẹp đáy biển tuyệt đẹp của Quần đảo Maldives.',
                duration: 3,
                photo: 'http://res.cloudinary.com/dpgjnngzt/image/upload/v1693155719/Travelpx-Soneva-Jani-2_vhhi0z.jpg',
                price: '15000000',
                availableSeats: 10,
                maxSeats: 10,
                startDate: '2023-10-30',
                endDate: '2023-12-30',
            },
            {
                _id: '64eb92c8f0787b66f2d65eee',
                category: '6153f2e39c6c9bdf49ec1c90',
                guide: '6153f2e39c6c9bdf49ec1e03',
                itineraries: ['Ngày 1: Đi leo núi', 'Ngày 2: Trải nghiệm đồng cỏ', 'Ngày 3: Chinh phục đỉnh'],
                address: 'Việt Nam',
                tourName: 'Thử thách leo núi Trường Sơn',
                description:
                    'Chinh phục đỉnh cao nhất miền Trung Việt Nam và thưởng thức cảnh quan tuyệt đẹp từ trên cao.',
                duration: 3,
                photo: 'http://res.cloudinary.com/dpgjnngzt/image/upload/v1693155740/momo-upload-api-210817095950-637647911908409737_wewd8m.jpg',
                price: '8000000',
                availableSeats: 10,
                maxSeats: 10,
                startDate: '2023-10-30',
                endDate: '2023-12-30',
            },
            {
                category: '6153f2e39c6c9bdf49ec1c90',
                guide: '6153f2e39c6c9bdf49ec1e02',
                itineraries: [
                    'Ngày 1: Hướng dẫn kayak cơ bản',
                    'Ngày 2: Khám phá hẻm núi',
                    'Ngày 3: Đi kayak qua thác nước',
                ],
                address: 'Colorado',
                tourName: 'Phiêu lưu kayaking trên sông Colorado',
                description:
                    'Tận hưởng cuộc sống ngoài trời khi kayak qua những điểm nổi tiếng trên dòng sông Colorado.',
                duration: 3,
                photo: 'http://res.cloudinary.com/dpgjnngzt/image/upload/v1693155759/cc8qb9rmjoxgsl2wx7fe_r9nmrg.webp',
                price: '7000000',
                availableSeats: 10,
                maxSeats: 10,
                startDate: '2023-10-30',
                endDate: '2023-12-30',
            },
            {
                category: '6153f2e39c6c9bdf49ec1c90',
                guide: '6153f2e39c6c9bdf49ec1e03',
                itineraries: [
                    'Ngày 1: Tiếp cận rừng',
                    'Ngày 2: Đi bộ qua rừng dày',
                    'Ngày 3: Tìm kiếm loài chim quý hiếm',
                ],
                address: 'Rừng rậm Amazon',
                tourName: 'Khám phá rừng Amazon',
                description:
                    'Hãy cùng tham gia chuyến hành trình để khám phá vẻ đẹp thiên nhiên hoang dã và sự đa dạng sinh học của rừng Amazon.',
                duration: 3,
                photo: 'http://res.cloudinary.com/dpgjnngzt/image/upload/v1693156745/amazon_reqe5d.png',
                price: '10000000',
                availableSeats: 10,
                maxSeats: 10,
                startDate: '2023-10-30',
                endDate: '2023-12-30',
            },
            {
                category: '6153f2e39c6c9bdf49ec1c90',
                guide: '6153f2e39c6c9bdf49ec1e01',
                itineraries: [
                    'Ngày 1: Bắt đầu từ thung lũng',
                    'Ngày 2: Vượt qua núi non',
                    'Ngày 3: Đạt đến đỉnh cao nhất',
                ],
                address: 'Nhật bản',
                tourName: 'Thử thách đi bộ tại Himalaya',
                description:
                    'Hành trình hấp dẫn qua những ngọn núi cao của dãy Himalaya và thưởng ngoạn cảnh quan tuyệt đẹp từ trên cao.',
                duration: 3,
                photo: 'http://res.cloudinary.com/dpgjnngzt/image/upload/v1693156760/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006_edit_1_ivf6ma.jpg',
                price: '11000000',
                availableSeats: 10,
                maxSeats: 10,
                startDate: '2023-10-30',
                endDate: '2023-12-30',
            },
            {
                category: '6153f2e39c6c9bdf49ec1c90',
                guide: '6153f2e39c6c9bdf49ec1e02',
                itineraries: [
                    'Ngày 1: Khám phá hang động',
                    'Ngày 2: Chèo kayak trong hang động',
                    'Ngày 3: Trải nghiệm bộ phận rừng nhiệt đới',
                ],
                address: 'New Zealand',
                tourName: 'Khám phá hang động Waitomo',
                description:
                    'Trải nghiệm cuộc sống hang động đặc biệt và tiếp xúc gần gũi với các loài động vật sinh sống trong hang.',
                duration: 3,
                photo: 'http://res.cloudinary.com/dpgjnngzt/image/upload/v1693156780/photo-1-16557129434501079781148_fkaxpx.webp',
                price: '8000000',
                availableSeats: 10,
                maxSeats: 10,
                startDate: '2023-10-30',
                endDate: '2023-12-30',
            },
            {
                category: '6153f2e39c6c9bdf49ec1c90',
                guide: '6153f2e39c6c9bdf49ec1e01',
                itineraries: [
                    'Ngày 1: Khám phá rạn san hô',
                    'Ngày 2: Thám hiểm vùng nước sâu',
                    'Ngày 3: Tìm hiểu về đời sống biển',
                ],
                address: 'Ấn Độ Dương',
                tourName: 'Khám phá Biển Đỏ dưới lòng biển',
                description:
                    'Thỏa mãn sự tò mò với cuộc sống biển đầy màu sắc và trải nghiệm lặn biển sâu tại Biển Đỏ.',
                duration: 3,
                photo: 'http://res.cloudinary.com/dpgjnngzt/image/upload/v1693156794/biendo-8037-1629873166_pi07xm.jpg',
                price: '14000000',
                availableSeats: 10,
                maxSeats: 10,
                startDate: '2023-10-30',
                endDate: '2023-12-30',
            },
            {
                category: '6153f2e39c6c9bdf49ec1c90',
                guide: '6153f2e39c6c9bdf49ec1e03',
                itineraries: [
                    'Ngày 1: Khám phá cảnh quan đặc biệt',
                    'Ngày 2: Chinh phục đồng cỏ và vùng núi',
                    'Ngày 3: Ngắm hoàng hôn trên cát',
                ],
                address: 'Thái Bình Dương',
                tourName: 'Hành trình xuyên sa mạc Atacama',
                description:
                    'Trải nghiệm cuộc sống sa mạc độc đáo và ngắm cảnh hoàng hôn tuyệt đẹp trong chuyến xe jeep.',
                duration: 3,
                photo: 'http://res.cloudinary.com/dpgjnngzt/image/upload/v1693156816/h1-1_eer3zk.jpg',
                price: '20000000',
                availableSeats: 10,
                maxSeats: 10,
                startDate: '2023-10-30',
                endDate: '2023-12-30',
            },
            {
                category: '6153f2e39c6c9bdf49ec1c91',
                guide: '6153f2e39c6c9bdf49ec1e03',
                itineraries: [
                    'Ngày 1: Tham quan chợ địa phương',
                    'Ngày 2: Học nấu ăn Pháp',
                    'Ngày 3: Thưởng thức bữa tối sang trọng',
                ],
                address: 'Thái Bình Dương',
                tourName: 'Khám phá ẩm thực Paris',
                description:
                    'Tận hưởng những món ăn ngon và trải nghiệm văn hóa ẩm thực đặc trưng của Paris, thủ đô nổi tiếng với ẩm thực.',
                duration: 3,
                photo: 'http://res.cloudinary.com/dpgjnngzt/image/upload/v1693157429/du-lich-phap-kham-pha-5-khu-cho-noi-tieng-nhat-cua-paris-trang-le-paris_n7ha5h.jpg',
                price: '11000000',
                availableSeats: 10,
                maxSeats: 10,
                startDate: '2023-10-30',
                endDate: '2023-12-30',
            },
            {
                category: '6153f2e39c6c9bdf49ec1c91',
                guide: '6153f2e39c6c9bdf49ec1e01',
                itineraries: [
                    'Ngày 1: Thăm quan vườn nho',
                    'Ngày 2: Trải nghiệm thu hoạch nho',
                    'Ngày 3: Thưởng thức rượu vang địa phương',
                ],
                address: 'Ý',
                tourName: 'Du lịch rượu vang Toscana',
                description:
                    'Khám phá vùng đất nổi tiếng với rượu vang Toscana và tham gia vào quá trình sản xuất rượu vang từ cây nho đến chai rượu.',
                duration: 3,
                photo: 'http://res.cloudinary.com/dpgjnngzt/image/upload/v1693157448/du-lich-va-ruou-vang-italia-1_snwzyg.jpg',
                price: '12000000',
                availableSeats: 10,
                maxSeats: 10,
                startDate: '2023-10-30',
                endDate: '2023-12-30',
            },
            {
                category: '6153f2e39c6c9bdf49ec1c91',
                guide: '6153f2e39c6c9bdf49ec1e01',
                itineraries: ['Ngày 1: Thăm chợ ẩm thực', 'Ngày 2: Học nấu món ăn Thai', 'Ngày 3: Dự lễ hội ẩm thực'],
                address: 'Thái Lan',
                tourName: 'Tham quan lễ hội ẩm thực Bangkok',
                description:
                    'Trải nghiệm hương vị độc đáo của ẩm thực Thái Lan và tham dự các lễ hội ẩm thực tại thành phố sôi động Bangkok.',
                duration: 3,
                photo: 'http://res.cloudinary.com/dpgjnngzt/image/upload/v1693157476/le-hoi-am-thuc-1-1682053091624954770217_wowdlg.jpg',
                price: '10000000',
                availableSeats: 10,
                maxSeats: 10,
                startDate: '2023-10-30',
                endDate: '2023-12-30',
            },
            {
                category: '6153f2e39c6c9bdf49ec1c91',
                guide: '6153f2e39c6c9bdf49ec1e02',
                itineraries: [
                    'Ngày 1: Thăm các nhà máy chưng cất rượu',
                    'Ngày 2: Trải nghiệm quá trình làm rượu',
                    'Ngày 3: Thưởng thức rượu vang danh tiếng',
                ],
                address: 'California',
                tourName: 'Khám phá Napa Valley và rượu vang California',
                description:
                    'Trải nghiệm hành trình qua các nhà máy chưng cất rượu, gặp gỡ nhà sản xuất rượu và thưởng thức rượu vang tại Napa Valley.',
                duration: 3,
                photo: 'http://res.cloudinary.com/dpgjnngzt/image/upload/v1693157513/webpc-passthru_hxpjz8.webp',
                price: '11000000',
                availableSeats: 10,
                maxSeats: 10,
                startDate: '2023-10-30',
                endDate: '2023-12-30',
            },
            {
                category: '6153f2e39c6c9bdf49ec1c91',
                guide: '6153f2e39c6c9bdf49ec1e02',
                itineraries: [
                    'Ngày 1: Thăm chợ địa phương',
                    'Ngày 2: Khám phá nhà hàng truyền thống',
                    'Ngày 3: Thưởng thức mỳ ramen gốc Kyoto',
                ],
                address: 'Nhật Bản',
                tourName: 'Khám phá ẩm thực Kyoto',
                description:
                    'Trải nghiệm hương vị độc đáo của ẩm thực Kyoto và khám phá những địa điểm nổi tiếng với các món ăn truyền thống.',
                duration: 3,
                photo: 'http://res.cloudinary.com/dpgjnngzt/image/upload/v1693157538/H_00480_002_ozxgci.webp',
                price: '13000000',
                availableSeats: 10,
                maxSeats: 10,
                startDate: '2023-10-30',
                endDate: '2023-12-30',
            },
            {
                category: '6153f2e39c6c9bdf49ec1c91',
                guide: '6153f2e39c6c9bdf49ec1e01',
                itineraries: [
                    'Ngày 1: Thăm vườn chè',
                    'Ngày 2: Trải nghiệm quy trình chế biến chè',
                    'Ngày 3: Thưởng thức chè đặc sản',
                ],
                address: 'Việt Nam',
                tourName: 'Hành trình khám phá chè Bắc Việt',
                description:
                    'Đắm mình trong không gian yên bình của vườn chè và tìm hiểu về quy trình chế biến chè truyền thống cùng với người dân địa phương.',
                duration: 3,
                photo: 'http://res.cloudinary.com/dpgjnngzt/image/upload/v1693157559/tc3a2m20chc3a2u_465fb531_akjk02.jpg',
                price: '9000000',
                availableSeats: 10,
                maxSeats: 10,
                startDate: '2023-10-30',
                endDate: '2023-12-30',
            },
            {
                category: '6153f2e39c6c9bdf49ec1c91',
                guide: '6153f2e39c6c9bdf49ec1e02',
                itineraries: [
                    'Ngày 1: Dạo chơi lễ hội',
                    'Ngày 2: Tham gia trò chơi và thưởng thức bia',
                    'Ngày 3: Khám phá ẩm thực nổi tiếng',
                ],
                address: 'Đức',
                tourName: 'Hành trình Ôc-tố-bê-xơ-fest',
                description:
                    'Trải nghiệm một trong những lễ hội bia lớn nhất thế giới, cùng tham gia vào trò chơi và thưởng thức ẩm thực đặc sản.',
                duration: 3,
                photo: 'http://res.cloudinary.com/dpgjnngzt/image/upload/v1693157580/kham-pha-le-hoi-bia-oktoberfest-munich-germany_7_5_2018_10_56_20_xbbq2v.jpg',
                price: '15000000',
                availableSeats: 10,
                maxSeats: 10,
                startDate: '2023-10-30',
                endDate: '2023-12-30',
            },
            {
                category: '6153f2e39c6c9bdf49ec1c91',
                guide: '6153f2e39c6c9bdf49ec1e03',
                itineraries: [
                    'Ngày 1: Tham quan các thành phố nổi tiếng',
                    'Ngày 2: Thăm viện trồng nho và nhà máy sản xuất rượu',
                    'Ngày 3: Thưởng thức rượu vang trên du thuyền sông',
                ],
                address: 'Pháp',
                tourName: 'Du lịch rượu vang Bordeaux',
                description:
                    'Khám phá vùng đất nổi tiếng với rượu vang Bordeaux, tham quan các viện trồng nho và thưởng thức rượu vang trên du thuyền sông Gironde.',
                duration: 3,
                photo: 'http://res.cloudinary.com/dpgjnngzt/image/upload/v1693157631/download_qpeeq7.jpg',
                price: '10000000',
                availableSeats: 10,
                maxSeats: 10,
                startDate: '2023-10-30',
                endDate: '2023-12-30',
            },
            {
                category: '6153f2e39c6c9bdf49ec1c87',
                guide: '6153f2e39c6c9bdf49ec1e03',
                itineraries: [
                    'Ngày 1: Thăm Hang Sửng Sốt và Hang Đầu Gỗ',
                    'Ngày 2: Trải nghiệm thuyền kayak trên biển',
                    'Ngày 3: Thưởng thức cảnh hoàng hôn trên du thuyền',
                ],
                address: 'Quảng Ninh',
                tourName: 'Hành trình khám phá Vịnh Hạ Long',
                description:
                    'Khám phá cảnh quan tuyệt đẹp của Vịnh Hạ Long, tham quan các hang động độc đáo và trải nghiệm cuộc sống trên du thuyền.',
                duration: 3,
                photo: 'http://res.cloudinary.com/dpgjnngzt/image/upload/v1693158306/du-lich-vinh-Ha-Long-hinh-anh1_1625911963_aqr0ze.jpg',
                price: '10000000',
                availableSeats: 10,
                maxSeats: 10,
                startDate: '2023-10-30',
                endDate: '2023-12-30',
            },
            {
                category: '6153f2e39c6c9bdf49ec1c87',
                guide: '6153f2e39c6c9bdf49ec1e01',
                itineraries: [
                    'Ngày 1: Tham quan Times Square và Trung tâm Rockefeller',
                    'Ngày 2: Chinh phục Tòa tháp tự do và Bảo tàng Guggenheim',
                    'Ngày 3: Thưởng thức buổi diễn Broadway',
                ],
                address: 'America',
                tourName: 'Khám phá New York City',
                description:
                    'Tận hưởng không gian sôi động của thành phố New York, tham quan các điểm danh tiếng và trải nghiệm văn hóa đa dạng.',
                duration: 3,
                photo: 'http://res.cloudinary.com/dpgjnngzt/image/upload/v1693158286/MyIC_Inline_74842_bl88qv.jpg',
                price: '30000000',
                availableSeats: 10,
                maxSeats: 10,
                startDate: '2023-10-30',
                endDate: '2023-12-30',
            },
            {
                category: '6153f2e39c6c9bdf49ec1c89',
                guide: '6153f2e39c6c9bdf49ec1e01',
                itineraries: [
                    'Ngày 1: Tham gia các hoạt động thể thao nước',
                    'Ngày 2: Thăm ruộng bát xào Maya và đền cổ Chichen Itza',
                    'Ngày 3: Thư giãn trên bờ biển Cancun',
                ],
                address: 'Mexico',
                tourName: 'Khám phá Bãi biển Cancun',
                description:
                    'Tận hưởng nắng và biển tại Bãi biển Cancun, tham gia các hoạt động thể thao nước, khám phá di sản văn hóa của người Maya.',
                duration: 3,
                photo: 'http://res.cloudinary.com/dpgjnngzt/image/upload/v1693158262/cancun_220414_qsy6py.webp',
                price: '30000000',
                availableSeats: 10,
                maxSeats: 10,
                startDate: '2023-10-30',
                endDate: '2023-12-30',
            },
            {
                category: '6153f2e39c6c9bdf49ec1c89',
                guide: '6153f2e39c6c9bdf49ec1e02',
                itineraries: [
                    'Ngày 1: Thăm quan Đền Uluwatu và thưởng thức bữa tối trên bãi biển',
                    'Ngày 2: Trải nghiệm lặn biển tại Sanur và tham quan Khu vườn Ngọc Trai',
                    'Ngày 3: Thư giãn trên bãi biển Nusa Dua',
                ],
                address: 'Indonesia',
                tourName: 'Hành trình du lịch bãi biển Bali',
                description:
                    'Khám phá vẻ đẹp tự nhiên của bãi biển Bali, tham gia các hoạt động lặn biển, thưởng thức ẩm thực địa phương và thả lỏng cơ thể trên bãi biển Nusa Dua.',
                duration: 3,
                photo: 'http://res.cloudinary.com/dpgjnngzt/image/upload/v1693158237/bien-broken-broken-beach-top-bai-bien-dep-nhat-bali-thaiantravel-2_zzytzk.webp',
                price: '30000000',
                availableSeats: 10,
                maxSeats: 10,
                startDate: '2023-10-30',
                endDate: '2023-12-30',
            },
            {
                category: '6153f2e39c6c9bdf49ec1c88',
                guide: '6153f2e39c6c9bdf49ec1e01',
                itineraries: [
                    'Ngày 1: Tham quan Đền Asakusa và Chùa Sensoji ở Tokyo',
                    'Ngày 2: Trải nghiệm trang phục Kimono và lễ hội truyền thống',
                    'Ngày 3: Thăm ngôi làng truyền thống Shirakawa-go',
                ],
                address: 'Nhật Bản',
                tourName: 'Khám phá Văn hóa Nhật Bản',
                description:
                    'Tìm hiểu về văn hóa độc đáo của Nhật Bản qua việc tham quan các điểm du lịch văn hóa nổi tiếng, trải nghiệm trang phục Kimono và khám phá ngôi làng truyền thống.',
                duration: 3,
                photo: 'http://res.cloudinary.com/dpgjnngzt/image/upload/v1693158193/van_hoa_1_xiuvif.jpg',
                price: '30000000',
                availableSeats: 10,
                maxSeats: 10,
                startDate: '2023-10-30',
                endDate: '2023-12-30',
            },
            {
                category: '6153f2e39c6c9bdf49ec1c88',
                guide: '6153f2e39c6c9bdf49ec1e03',
                itineraries: [
                    'Ngày 1: Thăm quan Lâu đài Versailles và Vườn hoa nổi tiếng',
                    'Ngày 2: Khám phá Bảo tàng Louvre và các điểm tham quan văn hóa khác ở Paris',
                    'Ngày 3: Thưởng thức biểu diễn nghệ thuật',
                ],
                address: 'Pháp',
                tourName: 'Hành trình khám phá Lâu đài Versailles',
                description:
                    'Trải nghiệm văn hóa Pháp qua việc khám phá Lâu đài Versailles, tham quan các điểm tham quan văn hóa nổi tiếng ở Paris và thưởng thức biểu diễn nghệ thuật độc đáo.',
                duration: 3,
                photo: 'http://res.cloudinary.com/dpgjnngzt/image/upload/v1693158220/images1106887_1_iwvewz.jpg',
                price: '30000000',
                availableSeats: 10,
                maxSeats: 10,
                startDate: '2023-10-30',
                endDate: '2023-12-30',
            },
        ];
        await Tour.insertMany(tourData);

        await Review.createCollection()
            .then(() => {
                console.log('Review collection created');
            })
            .catch((err) => {
                console.error('Error creating Review collection:', err);
            });
        const reviewData = [
            {
                tourInfo: '64eb92c8f0787b66f2d65ecd',
                userInfo: '6153f2e39c6c9bdf49ec1f87',
                comment: 'Chuyến đi thật là tuyệt vời!',
                rating: 4,
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65ecd',
                userInfo: '6153f2e39c6c9bdf49ec1f88',
                comment: 'Cảm giác được hoà mình vào thiên nhiên, rất hài lòng!',
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65ece',
                userInfo: '6153f2e39c6c9bdf49ec1f87',
                comment: 'Tôi không có lời nào để chê về chuyến du lịch này!',
                rating: 4,
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65ece',
                userInfo: '6153f2e39c6c9bdf49ec1f91',
                comment: 'Chuyến du lịch thật tuyệt vời, đồ ăn rất ngon không có gì để chê cả!',
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65ece',
                userInfo: '6153f2e39c6c9bdf49ec1f92',
                comment: 'Hướng dẫn viên năng động, cảnh vật thật đẹp!',
                rating: 4,
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65ece',
                userInfo: '6153f2e39c6c9bdf49ec1f93',
                comment: 'Chuyến du lịch đã giúp tôi loại bỏ những căng thẳng sau giờ làm việc!',
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65ece',
                userInfo: '6153f2e39c6c9bdf49ec1f94',
                comment: 'Chuyến đi rất vui và thật nhiều ý nghĩa!',
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65ece',
                userInfo: '6153f2e39c6c9bdf49ec1f95',
                comment: 'Chuyến đi thật tuyệt vời, thật đáng để đi thêm một hoặc nhiều lần nữa!',
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65ece',
                userInfo: '6153f2e39c6c9bdf49ec1f88',
                comment: 'Tôi không có lời nào để chê về chuyến du lịch này!',
                rating: 4,
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65ece',
                userInfo: '6153f2e39c6c9bdf49ec1f88',
                comment: 'Thật tuyệt vời!',
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65ecd',
                userInfo: '6153f2e39c6c9bdf49ec1f87',
                comment: 'Tôi không có lời nào để chê về chuyến du lịch này!',
                rating: 4,
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65ecd',
                userInfo: '6153f2e39c6c9bdf49ec1f91',
                comment: 'Chuyến du lịch thật tuyệt vời, đồ ăn rất ngon không có gì để chê cả!',
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65ecd',
                userInfo: '6153f2e39c6c9bdf49ec1f92',
                comment: 'Hướng dẫn viên năng động, cảnh vật thật đẹp!',
                rating: 4,
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65ecd',
                userInfo: '6153f2e39c6c9bdf49ec1f93',
                comment: 'Chuyến du lịch đã giúp tôi loại bỏ những căng thẳng sau giờ làm việc!',
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65ecd',
                userInfo: '6153f2e39c6c9bdf49ec1f94',
                comment: 'Chuyến đi rất vui và thật nhiều ý nghĩa!',
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65ecd',
                userInfo: '6153f2e39c6c9bdf49ec1f95',
                comment: 'Chuyến đi thật tuyệt vời, thật đáng để đi thêm một hoặc nhiều lần nữa!',
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65ecd',
                userInfo: '6153f2e39c6c9bdf49ec1f88',
                comment: 'Tôi không có lời nào để chê về chuyến du lịch này!',
                rating: 4,
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65ece',
                userInfo: '6153f2e39c6c9bdf49ec1f88',
                comment: 'Thật tuyệt vời!',
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65ecf',
                userInfo: '6153f2e39c6c9bdf49ec1f87',
                comment: 'Tôi không có lời nào để chê về chuyến du lịch này!',
                rating: 4,
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65ecf',
                userInfo: '6153f2e39c6c9bdf49ec1f91',
                comment: 'Chuyến du lịch thật tuyệt vời, đồ ăn rất ngon không có gì để chê cả!',
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65ecf',
                userInfo: '6153f2e39c6c9bdf49ec1f92',
                comment: 'Hướng dẫn viên năng động, cảnh vật thật đẹp!',
                rating: 4,
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65ecf',
                userInfo: '6153f2e39c6c9bdf49ec1f93',
                comment: 'Chuyến du lịch đã giúp tôi loại bỏ những căng thẳng sau giờ làm việc!',
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65ecf',
                userInfo: '6153f2e39c6c9bdf49ec1f94',
                comment: 'Chuyến đi rất vui và thật nhiều ý nghĩa!',
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65ecf',
                userInfo: '6153f2e39c6c9bdf49ec1f95',
                comment: 'Chuyến đi thật tuyệt vời, thật đáng để đi thêm một hoặc nhiều lần nữa!',
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65ecf',
                userInfo: '6153f2e39c6c9bdf49ec1f88',
                comment: 'Tôi không có lời nào để chê về chuyến du lịch này!',
                rating: 4,
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65eee',
                userInfo: '6153f2e39c6c9bdf49ec1f87',
                comment: 'Tôi không có lời nào để chê về chuyến du lịch này!',
                rating: 4,
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65eee',
                userInfo: '6153f2e39c6c9bdf49ec1f91',
                comment: 'Chuyến du lịch thật tuyệt vời, đồ ăn rất ngon không có gì để chê cả!',
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65eee',
                userInfo: '6153f2e39c6c9bdf49ec1f92',
                comment: 'Hướng dẫn viên năng động, cảnh vật thật đẹp!',
                rating: 4,
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65eee',
                userInfo: '6153f2e39c6c9bdf49ec1f93',
                comment: 'Chuyến du lịch đã giúp tôi loại bỏ những căng thẳng sau giờ làm việc!',
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65eee',
                userInfo: '6153f2e39c6c9bdf49ec1f94',
                comment: 'Chuyến đi rất vui và thật nhiều ý nghĩa!',
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65eee',
                userInfo: '6153f2e39c6c9bdf49ec1f95',
                comment: 'Chuyến đi thật tuyệt vời, thật đáng để đi thêm một hoặc nhiều lần nữa!',
            },
            {
                tourInfo: '64eb92c8f0787b66f2d65eee',
                userInfo: '6153f2e39c6c9bdf49ec1f96',
                comment: 'Tôi không có lời nào để chê về chuyến du lịch này!',
                rating: 4,
            },
        ];
        await Review.insertMany(reviewData);

        await Booking.createCollection()
            .then(() => {
                console.log('Booking collection created');
            })
            .catch((err) => {
                console.error('Error creating Booking collection:', err);
            });
        await Feedback.createCollection()
            .then(() => {
                console.log('Feedback collection created');
            })
            .catch((err) => {
                console.error('Error creating Feedback collection:', err);
            });
        const feedbackData = [
            {
                userInfo: '6153f2e39c6c9bdf49ec1f87',
                message:
                    'Tour du lịch này thật tuyệt vời! Tôi đã có cơ hội khám phá những địa điểm đẹp và trải nghiệm văn hóa mới mẻ.',
            },
            {
                userInfo: '6153f2e39c6c9bdf49ec1f88',
                message:
                    'Tôi rất hài lòng với tour du lịch này. Hướng dẫn viên rất chuyên nghiệp và am hiểu, giúp tôi có một trải nghiệm thú vị và không bỏ qua bất kỳ điểm tham quan quan trọng nào.',
            },
            {
                userInfo: '6153f2e39c6c9bdf49ec1f87',
                message:
                    'Tour du lịch của các bạn đã mang lại cho tôi những kỷ niệm khó quên. Tôi được tham gia vào các hoạt động phiêu lưu, thưởng thức ẩm thực đặc sản và gặp gỡ những người bạn mới.',
            },
            {
                userInfo: '6153f2e39c6c9bdf49ec1f88',
                message:
                    'Tour du lịch thật tuyệt vời! Cảnh quan tuyệt đẹp, khí hậu dễ chịu và dịch vụ chăm sóc khách hàng xuất sắc đã khiến chuyến đi của tôi trở thành một kỷ niệm không thể quên.',
            },
            {
                userInfo: '6153f2e39c6c9bdf49ec1f88',
                message:
                    'Cảm ơn công ty đã mang lại cho tôi sự thoải mái và giảm căng thẳng sau những ngày làm việc căng thẳng. Tôi đã có thời gian để thư giãn, tận hưởng và khám phá những điều mới mẻ.',
            },
        ];
        await Feedback.insertMany(feedbackData);

        await Payment.createCollection()
            .then(() => {
                console.log('Payment collection created');
            })
            .catch((err) => {
                console.error('Error creating Payment collection:', err);
            });
        await Message.createCollection()
            .then(() => {
                console.log('Message collection created');
            })
            .catch((err) => {
                console.error('Error creating Message collection:', err);
            });
        await Chat.createCollection()
            .then(() => {
                console.log('Chat collection created');
            })
            .catch((err) => {
                console.error('Error creating Chat collection:', err);
            });
        await Wishlist.createCollection()
            .then(() => {
                console.log('Wishlist collection created');
            })
            .catch((err) => {
                console.error('Error creating Wishlist collection:', err);
            });
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        // Đóng kết nối tới MongoDB sau khi hoàn thành seed
        mongoose.disconnect();
    }
}

seed();
