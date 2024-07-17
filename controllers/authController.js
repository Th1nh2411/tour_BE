import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import * as mailConfig from '../config/mailConfig.js';
import * as clientConfig from '../config/clientConfig.js';
import UserTemp from '../models/UserTemp.js';

export const register = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const randomID = Math.floor(100000 + Math.random() * 900000);
        const userTemp = new UserTemp({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo,
            address: req.body.address,
            fullName: req.body.fullName,
            phoneNumber: req.body.phoneNumber,
            activeID: randomID,
            type: 'register', // Loại yêu cầu là đăng ký mới
        });

        await userTemp.save();
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'n19dccn107@student.ptithcm.edu.vn', // generated ethereal user
                pass: 'dzwedtbaoqsmrkob', // generated ethereal password
            },
        });
        await transporter.sendMail({
            from: 'HOLIDATE SECURITY', // sender address
            to: `${req.body.email}`, // list of receivers
            subject: 'HOLIDATE SECURITY', // Subject line
            text: 'HOLIDATE SECURITY', // plain text body
            html: mailConfig.html(`
                <h2>Activation URL<br>
                    <a href='${clientConfig.url}/login?activeID=${randomID}'>Click here</a>
                </h2>`), // htm, // html body
        });
        res.status(200).json({
            success: true,
            message: 'Đã ghi nhận thông tin. Vui lòng kiểm tra email để xác thực. Mã xác thực có hiệu lực trong 30 phút!',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

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
                return res.status(404).json({ success: false, message: 'Sai mật khẩu' });
            } else {
                const { password, ...rest } = user._doc;
                // create jwt token
                const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
                    expiresIn: '1d',
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
            return res.status(404).json({ success: false, message: 'Username không tồn tại' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
