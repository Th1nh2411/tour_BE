import express from 'express';
import { login, register } from '../controllers/authController.js';
import { checkExistUsername, checkExistEmail, checkExistPhoneNumber } from '../utils/checkExist.js';

const router = express.Router();

router.post('/register', checkExistUsername, checkExistEmail, checkExistPhoneNumber, register);
router.post('/login', login);

export default router;
