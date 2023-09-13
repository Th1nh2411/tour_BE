import express from 'express';
import { getAllFeedback, createFeedback } from '../controllers/feedbackController.js';
import { verifyAdmin, verifyToken } from '../utils/authenticate.js';

const router = express.Router();
router.get('/', verifyToken, verifyAdmin, getAllFeedback);
router.post('/', verifyToken, createFeedback);

export default router;
