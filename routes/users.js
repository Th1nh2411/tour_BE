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
    active,
    getAllStaff,
} from '../controllers/userController.js';

import { verifyAdmin, verifyToken, verifyUser } from '../utils/authenticate.js';
import { checkExistPhoneNumber, checkExistUser } from '../utils/checkExist.js';

const router = express.Router();

//Update user
router.put('/profile', checkExistPhoneNumber, verifyToken, updateUser);
router.post('/active', active);
router.put('/changepassword', verifyToken, changePassword);
router.post('/forgotpassword', forgotPassword);
router.post('/forgotpassword/verify', verify);
router.post('/forgotpassword/success', accessForgotPassword);
router.post('/create', verifyToken, verifyAdmin, createUser);

router.delete('/:id', verifyToken, verifyUser, checkExistUser, deleteUser);

//Get single user
router.get('/:id', verifyToken, verifyUser, checkExistUser, getDetailUser);

//Get all user
router.get('/', verifyToken, verifyAdmin, getAllUser);
router.get('/message/chat', verifyToken, verifyUser, getAllStaff);

export default router;
