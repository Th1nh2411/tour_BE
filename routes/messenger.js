import express from 'express';
import {
    getAllMessage,
    getSupportMessage,
    sendMessage,
    sendSupportMessage,
} from '../controllers/messengerController.js';
import { verifyToken } from '../utils/authenticate.js';

const router = express.Router();
router.get('/', verifyToken, getAllMessage);
router.post('/', verifyToken, sendMessage);
router.get('/support', verifyToken, getSupportMessage);
router.post('/support', verifyToken, sendSupportMessage);

export default router;
