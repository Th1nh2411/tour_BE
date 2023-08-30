import express from 'express';
import { createReview, getAllReviewById } from '../controllers/reviewController.js';
import { verifyToken, verifyUser } from '../utils/authenticate.js';

const router = express.Router();

router.post('/:id', verifyToken, verifyUser, createReview);
router.get('/:id', getAllReviewById);

export default router;
