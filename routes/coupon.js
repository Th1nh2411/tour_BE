import express from 'express';
import { createCoupon, getAllCoupon, getDetailCoupon, updateCoupon } from '../controllers/couponController.js';
import { verifyAdmin, verifyToken } from '../utils/authenticate.js';

const router = express.Router();

router.post('/', verifyToken, verifyAdmin, createCoupon);
router.get('/:id', verifyToken, getDetailCoupon);
router.get('/', verifyToken, getAllCoupon);
router.put('/:id', verifyToken, verifyAdmin, updateCoupon);

export default router;
