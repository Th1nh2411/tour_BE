import express from 'express';
import { createReview, get8LatestReview, getAllReviewById } from '../controllers/reviewController.js';
import { verifyToken, verifyUser } from '../utils/authenticate.js';
import { checkExistTour } from '../utils/checkExist.js';

const router = express.Router();

router.post('/:id', verifyToken, verifyUser, checkExistTour, createReview);
router.get('/:id', checkExistTour, getAllReviewById);
router.get('/', get8LatestReview);

export default router;
