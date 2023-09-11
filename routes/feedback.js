import express from 'express';
import { getAllFeedback, createFeedback } from '../controllers/feedbackController.js';
import { verifyToken } from '../utils/authenticate.js';

const router = express.Router();
router.get('/', getAllFeedback);
router.post('/', verifyToken, createFeedback);

export default router;
