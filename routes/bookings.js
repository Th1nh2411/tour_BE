import express from 'express';
import {
    createBooking,
    getAllBooking,
    getDetailBooking,
    cancelBooking,
    checkBooking,
} from '../controllers/bookingController.js';
import { verifyUser, verifyToken } from '../utils/authenticate.js';
import { checkActiveAccount, checkDateBooking } from '../utils/checkCreate.js';
import { checkExistBooking, checkUnPaidBooking } from '../utils/checkExist.js';
const router = express.Router();

router.post('/', verifyToken, verifyUser, checkActiveAccount, checkDateBooking, checkUnPaidBooking, createBooking);
router.get('/:id', verifyToken, checkExistBooking, getDetailBooking);
router.get('/check/payment', verifyToken, checkBooking);
router.get('/', verifyToken, getAllBooking);
router.post('/cancel/:id', verifyToken, checkExistBooking, cancelBooking);

export default router;
