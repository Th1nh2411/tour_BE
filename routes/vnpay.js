import express from 'express';
const router = express.Router();
import querystring from 'qs';
import vnpayConfig from '../config/vnpayConfig.js';
import crypto from 'crypto';
import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';
import Tour from '../models/Tour.js';
import moment from 'moment';

router.post('/create_payment_url', async function (req, res, next) {
    let id_order = req.body.id_order;
    let flag = req.body.flag;
    try {
        const booking = await Booking.findById(id_order);

        if (booking) {
            if (booking.status == 2) {
                res.status(400).json({ success: false, message: 'Hoá đơn của bạn đã được thanh toán.' });
            } else if (booking.status == -1) {
                res.status(400).json({ success: false, message: 'Hoá đơn của bạn đã huỷ.' });
            } else {
                process.env.TZ = 'Asia/Ho_Chi_Minh';

                let date = new Date();
                let createDate = moment(date).format('YYYYMMDDHHmmss');

                let ipAddr =
                    req.headers['x-forwarded-for'] ||
                    req.connection.remoteAddress ||
                    req.socket.remoteAddress ||
                    req.connection.socket.remoteAddress;

                let tmnCode = vnpayConfig.vnp_TmnCode;
                let secretKey = vnpayConfig.vnp_HashSecret;
                let vnpUrl = vnpayConfig.vnp_Url;
                let returnUrl = vnpayConfig.vnp_ReturnUrl;
                let bankCode = 'NCB';

                let locale = req.body.language;
                if (locale === null || locale === '' || locale === undefined) {
                    locale = 'vn';
                }
                let currCode = 'VND';
                let vnp_Params = {};
                vnp_Params['vnp_Version'] = '2.1.0';
                vnp_Params['vnp_Command'] = 'pay';
                vnp_Params['vnp_TmnCode'] = tmnCode;
                vnp_Params['vnp_Locale'] = locale;
                vnp_Params['vnp_CurrCode'] = currCode;
                vnp_Params['vnp_TxnRef'] = id_order.toString() + flag.toString();
                vnp_Params['vnp_OrderInfo'] = 'Thanh toán cho mã đơn hàng:' + id_order;
                vnp_Params['vnp_OrderType'] = 'other';
                if (booking.status == 0 && flag == 1) {
                    vnp_Params['vnp_Amount'] = booking.total * 20;
                } else if (booking.status == 0 && flag == 2) {
                    vnp_Params['vnp_Amount'] = booking.total * 100;
                } else {
                    vnp_Params['vnp_Amount'] = booking.total * 80;
                }
                vnp_Params['vnp_ReturnUrl'] = returnUrl;
                vnp_Params['vnp_IpAddr'] = ipAddr;
                vnp_Params['vnp_CreateDate'] = createDate;
                if (bankCode !== null && bankCode !== '') {
                    vnp_Params['vnp_BankCode'] = bankCode;
                }

                vnp_Params = sortObject(vnp_Params);

                let signData = querystring.stringify(vnp_Params, { encode: false });

                let hmac = crypto.createHmac('sha512', secretKey);
                let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
                vnp_Params['vnp_SecureHash'] = signed;
                vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
                res.status(200).json({ success: true, data: vnpUrl });
            }
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/vnpay_return', async function (req, res, next) {
    try {
        let vnp_Params = req.query;

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        let id_order = vnp_Params.vnp_TxnRef.slice(0, -1);
        let amount = vnp_Params.vnp_Amount / 100;

        let secretKey = vnpayConfig.vnp_HashSecret;

        let signData = querystring.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac('sha512', secretKey);

        const booking = await Booking.findById(id_order);
        if (booking.status == 0 && amount != booking.total) {
            await Booking.findOneAndUpdate(
                {
                    _id: id_order,
                },
                {
                    status: 1,
                },
                { new: true },
            );
            const newPayment = new Payment({
                userInfo: booking.userInfo,
                tourInfo: booking.tourInfo,
                amount: 0.2 * booking.total,
                description: `Thanh toán cọc cho đơn đặt mã số: ${booking._id}`,
            });
            await Tour.findOneAndUpdate(
                {
                    _id: booking.tourInfo,
                },
                {
                    $inc: { availableSeats: -booking.guestSize },
                },
                { new: true },
            );
            await newPayment.save();
            res.status(200).json({ success: true, message: 'Thanh toán tiền cọc thành công.' });
        } else if (booking.status == 0 && amount == booking.total) {
            await Booking.findOneAndUpdate(
                {
                    _id: id_order,
                },
                {
                    status: 2,
                },
                { new: true },
            );
            const newPayment = new Payment({
                userInfo: booking.userInfo,
                tourInfo: booking.tourInfo,
                amount: booking.total,
                description: `Thanh toán toàn bộ cho đơn đặt mã số: ${booking._id}!`,
            });
            await Tour.findOneAndUpdate(
                {
                    _id: booking.tourInfo,
                },
                {
                    $inc: { availableSeats: -booking.guestSize },
                },
                { new: true },
            );
            await newPayment.save();
            res.status(200).json({ success: true, message: 'Thanh toán thành công.' });
        } else {
            await Booking.findOneAndUpdate(
                {
                    _id: id_order,
                },
                {
                    status: 2,
                },
                { new: true },
            );
            const newPayment = new Payment({
                userInfo: booking.userInfo,
                tourInfo: booking.tourInfo,
                amount: 0.8 * booking.total,
                description: `Thanh toán phần còn lại cho đơn đặt mã số: ${booking._id}!`,
            });
            await newPayment.save();
            res.status(200).json({ success: true, message: 'Thanh toán thành công.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/refund', function (req, res, next) {
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    let date = new Date();

    let vnp_TmnCode = vnpayConfig.vnp_TmnCode;
    let secretKey = vnpayConfig.vnp_HashSecret;
    let vnp_Api = vnpayConfig.vnp_Api;

    let vnp_TxnRef = req.body.id_order;
    let vnp_TransactionDate = req.body.transDate;
    let vnp_Amount = req.body.amount * 100;
    let vnp_TransactionType = req.body.transType;
    let vnp_CreateBy = req.body.user;

    let currCode = 'VND';

    let vnp_RequestId = moment(date).format('HHmmss');
    let vnp_Version = '2.1.0';
    let vnp_Command = 'refund';
    let vnp_OrderInfo = 'Hoan tien GD ma:' + vnp_TxnRef;

    let vnp_IpAddr =
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');

    let vnp_TransactionNo = '0';

    let data =
        vnp_RequestId +
        '|' +
        vnp_Version +
        '|' +
        vnp_Command +
        '|' +
        vnp_TmnCode +
        '|' +
        vnp_TransactionType +
        '|' +
        vnp_TxnRef +
        '|' +
        vnp_Amount +
        '|' +
        vnp_TransactionNo +
        '|' +
        vnp_TransactionDate +
        '|' +
        vnp_CreateBy +
        '|' +
        vnp_CreateDate +
        '|' +
        vnp_IpAddr +
        '|' +
        vnp_OrderInfo;
    let hmac = crypto.createHmac('sha512', secretKey);
    let vnp_SecureHash = hmac.update(new Buffer(data, 'utf-8')).digest('hex');

    let dataObj = {
        vnp_RequestId: vnp_RequestId,
        vnp_Version: vnp_Version,
        vnp_Command: vnp_Command,
        vnp_TmnCode: vnp_TmnCode,
        vnp_TransactionType: vnp_TransactionType,
        vnp_TxnRef: vnp_TxnRef,
        vnp_Amount: vnp_Amount,
        vnp_TransactionNo: vnp_TransactionNo,
        vnp_CreateBy: vnp_CreateBy,
        vnp_OrderInfo: vnp_OrderInfo,
        vnp_TransactionDate: vnp_TransactionDate,
        vnp_CreateDate: vnp_CreateDate,
        vnp_IpAddr: vnp_IpAddr,
        vnp_SecureHash: vnp_SecureHash,
    };

    request(
        {
            url: vnp_Api,
            method: 'POST',
            json: true,
            body: dataObj,
        },
        function (error, response, body) {
            console.log(response);
        },
    );
});

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
}

export default router;
