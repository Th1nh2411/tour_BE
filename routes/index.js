import express from 'express';
import toursRouter from './tours.js';
import userRouter from './users.js';
import authRouter from './auth.js';
import reviewRouter from './reviews.js';
import bookingRouter from './bookings.js';
import uploadRouter from './upload.js';
import categoryRouter from './category.js';
import guideRouter from './guide.js';
import wishlistRouter from './wishlist.js';
import vnpayRouter from './vnpay.js';
import feedbackRouter from './feedback.js';
import messageRouter from './message.js';
const rootRouter = express.Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/booking', bookingRouter);
rootRouter.use('/review', reviewRouter);
rootRouter.use('/tour', toursRouter);
rootRouter.use('/upload', uploadRouter);
rootRouter.use('/user', userRouter);
rootRouter.use('/category', categoryRouter);
rootRouter.use('/guide', guideRouter);
rootRouter.use('/wishlist', wishlistRouter);
rootRouter.use('/vnpay', vnpayRouter);
rootRouter.use('/feedback', feedbackRouter);
rootRouter.use('/message', messageRouter);

export default rootRouter;
