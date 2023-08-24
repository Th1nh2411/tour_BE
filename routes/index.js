import express from "express";
import toursRouter from "./tours.js";
import userRouter from "./users.js";
import authRouter from "./auth.js";
import reviewRouter from "./reviews.js";
import bookingRouter from "./bookings.js";
import uploadRouter from "./upload.js";

const rootRouter = express.Router();

rootRouter.use('/api/v1/auth', authRouter);
rootRouter.use('/api/v1/booking', bookingRouter);
rootRouter.use('/api/v1/review', reviewRouter);
rootRouter.use('/api/v1/tours', toursRouter);
rootRouter.use('/upload', uploadRouter);
rootRouter.use('/api/v1/users', userRouter);
export default rootRouter;
