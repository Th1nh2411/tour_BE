import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rootRouter from './routes/index.js';

import db from './utils/db.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: process.env.ENV === 'dev' ? true : 'https://holidate.vercel.app',
    credentials: true,
};
//database connection

await db.connect();
//middle ware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api/v1', rootRouter);
app.listen(port, async () => {
    console.log(`server listening http://localhost:${port}/`);
});
