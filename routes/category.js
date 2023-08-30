import express from 'express';
import {
    createCategory,
    getDetailCategory,
    getAllCategory,
    updateCategory,
} from '../controllers/categoryController.js';
import { verifyAdmin, verifyToken } from '../utils/authenticate.js';

const router = express.Router();

router.post('/', verifyToken, verifyAdmin, createCategory);
router.get('/:id', getDetailCategory);
router.get('/', getAllCategory);
router.put('/:id', verifyToken, verifyAdmin, updateCategory);

export default router;
