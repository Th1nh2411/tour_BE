import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rootRouter from './routes/index.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import db from './utils/db.js';
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('chat:message', (message) => {
        // Xử lý tin nhắn và gửi lại cho tất cả các client
        io.emit('chat:message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const port = process.env.PORT || 8000;
const corsOptions = {
    origin: process.env.ENV === 'dev' ? true : 'http://holidate.vercel.app',
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
