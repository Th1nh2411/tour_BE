import express from 'express';
import {
    createCategory,
    getDetailCategory,
    getAllCategory,
    updateCategory,
} from '../controllers/categoryController.js';
import { verifyAdmin, verifyToken } from '../utils/authenticate.js';
import { checkExistCategory, checkExistCategoryName } from '../utils/checkExist.js';
const router = express.Router();

router.post('/', verifyToken, verifyAdmin, checkExistCategoryName, createCategory);
router.get('/:id', checkExistCategory, getDetailCategory);
router.get('/', getAllCategory);
router.put('/:id', verifyToken, verifyAdmin, checkExistCategory, updateCategory);

export default router;
