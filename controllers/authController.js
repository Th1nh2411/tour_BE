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
export const login = async (req, res) => {
    try {
        const username = req.body.username;
        const user = await User.findOne({ username });
        // if user doesn't exist
        if (user) {
            // if user is exist then check the passord or compare the password
            const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password);

            // if password incorrect
            if (!checkCorrectPassword) {
                return res.status(401).json({ success: false, message: 'Wrong password' });
            } else {
                const { password, ...rest } = user._doc;
                // create jwt token
                const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
                    expiresIn: '15d',
                });

                // set token in the browser cookies and send the response to the client
                res.cookie('accessToken', token, {
                    httpOnly: true,
                    expires: token.expiresIn,
                    sameSite: process.env.ENV === 'dev' ? true : 'none',
                    secure: process.env.ENV === 'dev' ? false : true,
                })
                    .status(200)
                    .json({ token, data: { ...rest } });
            }
        } else {
            return res.status(404).json({ success: false, message: 'username is not exist' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
