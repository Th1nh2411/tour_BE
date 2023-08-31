import express from 'express';
import { createGuide, getAllGuide, getDetailGuide, updateGuide } from '../controllers/guideController.js';
import { verifyAdmin, verifyToken } from '../utils/authenticate.js';
import { checkExistEmail, checkExistPhoneNumber } from '../utils/checkExist.js';
const router = express.Router();

router.post('/', verifyToken, verifyAdmin, checkExistEmail, checkExistPhoneNumber, createGuide);
router.get('/:id', getDetailGuide);
router.get('/', getAllGuide);
router.put('/:id', verifyToken, verifyAdmin, updateGuide);

export default router;
