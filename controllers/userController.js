import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

//Create new User
export const createUser = async (req, res) => {
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();

        res.status(200).json({ success: true, message: 'Create Successful', data: savedUser });
    } catch (error) {
        res.status(500).json({ success: true, message: error.message });
    }
};

//Update User
export const updateUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            id,
            {
                $set: req.user.id,
            },
            { new: true },
        );

        res.status(200).json({ success: true, message: 'Update Successful' });
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
                        message: 'The old password and the new password must be different!',
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
                        message: 'Change password succesful',
                    });
                }
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Repeat password is wrong',
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Wrong password',
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const accessForgotPassword = async (req, res) => {
    const { newPassword, repeatPassword, email, username } = req.body;
    try {
        if (newPassword == repeatPassword) {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(newPassword, salt);
            await User.findOneAndUpdate(
                {
                    username,
                    email,
                },
                {
                    $set: { password: hashPassword },
                },
                { new: true },
            );
            res.status(200).json({
                success: true,
                message: 'Reset password succesful',
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Repeat password is wrong',
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const verify = async (req, res) => {
    const { username, email, verifyID } = req.body;
    try {
        const user = await User.findOne({
            username,
            email,
            verifyID,
        });
        if (user) {
            res.status(200).json({
                success: true,
                message: `Mã xác minh chính xác tiến hành nhập mật khẩu mới!`,
            });
        } else {
            res.status(400).json({
                success: false,
                message: `Mã xác minh không chính xác!`,
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const forgotPassword = async (req, res) => {
    const { username, email } = req.body;
    try {
        const user = await User.findOne({
            username,
            email,
        });
        if (user) {
            const verifyID = (Math.random() + 1).toString(36).substring(2);
            await User.findOneAndUpdate(
                {
                    username,
                    email,
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
                to: `${email}`, // list of receivers
                subject: 'Lấy lại mật khẩu', // Subject line
                text: 'Lấy lại mật khẩu', // plain text body
                html: `<!DOCTYPE html>
                <html>
                <head>
                  <meta charset="UTF-8">
                  <style>
                    body {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                    background-color: #f2f2f2;
                    }

                    h1 {
                    color: #000000;
                    }

                    p {
                    color: #000000;
                    line-height: 1.5;
                    }

                    ul {
                    list-style-type: disc;
                    padding-left: 20px;
                    }

                    li {
                    color: #000000;
                    }

                    .contact-info {
                    margin-top: 20px;
                    color: #999999;
                    }
                </style>
                </head>
                <body>
                  <h1>Chào bạn!</h1>
                  <p>Hệ thống bảo mật Holidate.</p>
                  <p>Dưới đây là mã xác minh reset mật khẩu của bạn:</p>
                  <ul>
                    <li>Mã xác minh: <strong>${verifyID}</strong></li>
                  </ul>
                  <p>Xin vui lòng liên hệ với chúng tôi nếu quý khách gặp bất kỳ vấn đề gì.</p>
                  <div class="contact-info">
                    <p>Số điện thoại: 0961592551</p>
                    <p>Email liên hệ: holidatesupport@gmail.com</p>
                </div>
                  <p>Trân trọng,</p>
                  <p>Đội ngũ Holidate</p>
                </body>
                </html>
            `, // htm, // html body
            });
            res.status(200).json({
                success: true,
                message: `Mã xác minh đã được gửi về email vui lòng kiểm tra hòm thư!`,
            });
        } else {
            res.status(400).json({
                success: false,
                message: `Thông tin chưa chính xác!`,
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

        res.status(200).json({ success: true, message: 'Delete Successful' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//Get single User
export const getDetailUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);

        res.status(200).json({ success: true, message: 'Successfully', data: user });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({});

        res.status(200).json({ success: true, message: 'Successfully', data: users });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};
