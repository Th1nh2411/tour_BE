import express from 'express';
import { getAllMessage, sendMessage } from '../controllers/messengerController.js';
import { verifyToken } from '../utils/authenticate.js';

const router = express.Router();
router.get('/', verifyToken, getAllMessage);
router.post('/', verifyToken, sendMessage);

export default router;
