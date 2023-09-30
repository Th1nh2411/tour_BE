import express from 'express';
import {
    countMessageUnRead,
    getSupportMessage,
    sendSupportMessage,
    transAllMessageToReaded,
} from '../controllers/messengerController.js';
import { verifyToken } from '../utils/authenticate.js';

const router = express.Router();
router.get('/support/get', verifyToken, getSupportMessage);
router.post('/support/send', verifyToken, sendSupportMessage);
router.post('/support/read', verifyToken, transAllMessageToReaded);
router.post('/support/count', verifyToken, countMessageUnRead);

export default router;
