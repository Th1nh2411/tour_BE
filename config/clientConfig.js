import dotenv from 'dotenv';
dotenv.config();
export const url = process.env.ENV === 'dev' ? 'http://localhost:3000' : 'https://holidate.vercel.app';
