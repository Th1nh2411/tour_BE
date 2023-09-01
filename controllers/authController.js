import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// user register
export const register = async (req, res) => {
    try {
        //hashing password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo,
            address: req.body.address,
            fullName: req.body.fullName,
            phoneNumber: req.body.phoneNumber,
        });

        await newUser.save();

        res.status(200).json({ success: true, message: 'Create Successful' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// user login
export const test = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
