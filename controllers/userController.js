import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import * as mailConfig from '../config/mailConfig.js';
import * as clientConfig from '../config/clientConfig.js';
import UserTemp from '../models/UserTemp.js';

//Create new User
export const createUser = async (req, res) => {
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();

        res.status(200).json({ success: true, message: 'Thêm mới thành công', data: savedUser });
    } catch (error) {
        res.status(500).json({ success: true, message: error.message });
    }
};

//Update User
export const updateUser = async (req, res) => {
    const id = req.user.id;
    try {
        if (!req.body.email) {
            await User.findByIdAndUpdate(
                id,
                {
                    $set: req.body,
                },
                { new: true },
            );
            res.status(200).json({ success: true, message: 'Cập nhật thành công' });
        } else {
            const randomID = Math.floor(100000 + Math.random() * 900000);
            const userUpdated = await User.findByIdAndUpdate(
                id,
                {
                    fullName: req.body.fullName,
                    phoneNumber: req.body.phoneNumber,
                    address: req.body.address,
                },
                { new: true },
            );
            const tempUser = new UserTemp({
                userId: id,
                email: req.body.email,
                activeID: randomID,
                type: 'update', // Loại yêu cầu là cập nhật email
            });

            await tempUser.save();

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
                    <a href='${clientConfig.url}?activeID=${randomID}'>Click here</a>
                </h2>`), // htm, // html body
            });
            res.status(200).json({
                success: true,
                message:
                    'Cập nhật thông tin thành công. Vui lòng kiểm tra hòm thư để xác thực. Mã xác thực có hiệu lực trong 30 phút!',
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const active = async (req, res) => {
    const { activeID } = req.body;
    try {
        const tempUser = await UserTemp.findOne({ activeID: activeID });

        if (!tempUser) {
            res.status(404).json({ success: false, message: 'Invalid or expired confirmation code.' });
        }

        if (!tempUser.userId) {
            // Xử lý đăng ký mới
            const newUser = new User({
                username: tempUser.username,
                email: tempUser.email,
                password: tempUser.password,
                photo: tempUser.photo,
                address: tempUser.address,
                fullName: tempUser.fullName,
                phoneNumber: tempUser.phoneNumber,
            });

            await newUser.save();

            await UserTemp.deleteOne({ activeID: activeID });

            res.status(200).json({ success: true, message: 'Xác thực email và tạo tài khoản thành công!', newEmail: tempUser.email });
        } else {
            // Xử lý cập nhật email
            await User.findByIdAndUpdate(tempUser.userId, { email: tempUser.email }, { new: true });
            
            await UserTemp.deleteOne({ activeID: activeID });
            res.status(200).json({ success: true, message: 'Xác thực email thành công! Tài khoản email của bạn đã được cập nhật.', newEmail: tempUser.email });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const changePassword = async (req, res) => {
    const id = req.user.id;
    const { oldPassword, newPassword, repeatPassword } = req.body;
    try {
        const user = await User.findById(id);
        const isAuth = bcrypt.compareSync(oldPassword, user.password);
        if (isAuth) {
            if (newPassword == repeatPassword) {
                if (newPassword == oldPassword) {
                    res.status(400).json({
                        success: true,
                        message: 'Mật khẩu cũ và mật khẩu mới phải khác nhau',
                    });
                } else {
                    const salt = bcrypt.genSaltSync(10);
                    const hashPassword = bcrypt.hashSync(newPassword, salt);
                    await User.findByIdAndUpdate(
                        id,
                        {
                            password: hashPassword,
                        },
                        { new: true },
                    );
                    res.status(200).json({
                        success: true,
                        message: 'Đổi mật khẩu thành công',
                    });
                }
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Mật khẩu lặp lại không khớp',
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Sai mật khẩu',
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const accessForgotPassword = async (req, res) => {
    const { newPassword, repeatPassword, username } = req.body;
    try {
        if (newPassword == repeatPassword) {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(newPassword, salt);
            await User.findOneAndUpdate(
                {
                    username,
                },
                {
                    $set: { password: hashPassword },
                },
                { new: true },
            );
            res.status(200).json({
                success: true,
                message: 'Lấy lại mật khẩu thành công',
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Mật khẩu lặp lại không khớp',
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const verify = async (req, res) => {
    const { username, verifyID } = req.body;
    try {
        const user = await User.findOne({
            username,
            verifyID,
        });
        if (user) {
            res.status(200).json({
                success: true,
                message: `Mã xác minh chính xác, tiến hành nhập mật khẩu mới`,
            });
        } else {
            res.status(400).json({
                success: false,
                message: `Mã xác minh không chính xác`,
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const forgotPassword = async (req, res) => {
    const { username } = req.body;
    try {
        const user = await User.findOne({
            username,
        });
        if (user) {
            const verifyID = (Math.random() + 1).toString(36).substring(2);
            await User.findOneAndUpdate(
                {
                    username,
                },
                {
                    $set: { verifyID: verifyID },
                },
                { new: true },
            );
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'n19dccn107@student.ptithcm.edu.vn', // generated ethereal user
                    pass: 'dzwedtbaoqsmrkob', // generated ethereal password
                },
            });
            // send mail with defined transport object
            await transporter.sendMail({
                from: 'HOLIDATE SECURITY', // sender address
                to: `${user.email}`, // list of receivers
                subject: 'HOLIDATE SECURITY', // Subject line
                text: 'HOLIDATE SECURITY', // plain text body
                html: mailConfig.html(`<h2>Your verification code<br>${verifyID}</h2>`), // htm, // html body
            });
            res.status(200).json({
                success: true,
                message: `Mã xác minh đã được gửi về email đăng ký, vui lòng kiểm tra hòm thư`,
            });
        } else {
            res.status(400).json({
                success: false,
                message: `Thông tin không chính xác`,
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//Delete User
export const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: 'Xoá thành công' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//Get single User
export const getDetailUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({});

        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllStaff = async (req, res) => {
    try {
        const users = await User.find({ role: 'admin' }).select('_id');

        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
