import express from 'express';
import {
    deleteUser,
    getAllUser,
    getDetailUser,
    updateUser,
    accessForgotPassword,
    changePassword,
    createUser,
    forgotPassword,
    verify,
    activeUser,
    verifyActiveUser,
} from '../controllers/userController.js';

import { verifyAdmin, verifyToken, verifyUser } from '../utils/authenticate.js';

const router = express.Router();

//Update user
router.put('/profile', verifyToken, updateUser);
router.get('/active', verifyToken, activeUser);
router.post('/active', verifyToken, verifyActiveUser);
router.put('/changepassword', verifyToken, changePassword);
router.post('/forgotpassword', forgotPassword);
router.post('/forgotpassword/verify', verify);
router.post('/forgotpassword/success', accessForgotPassword);
router.post('/create', verifyToken, verifyAdmin, createUser);

router.delete('/:id', verifyToken, verifyUser, deleteUser);

//Get single user
router.get('/:id', verifyToken, verifyUser, getDetailUser);

//Get all user
router.get('/', verifyToken, verifyAdmin, getAllUser);

export default router;
