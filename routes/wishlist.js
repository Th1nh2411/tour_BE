import express from 'express';
import { createTourToWishlist, getAllTourInWishlist } from '../controllers/wishlistController.js';
import { verifyUser, verifyToken } from '../utils/authenticate.js';

const router = express.Router();

router.post('/:id', verifyToken, verifyUser, createTourToWishlist);
router.get('/', verifyToken, verifyUser, getAllTourInWishlist);

export default router;
