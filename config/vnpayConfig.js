import * as clientConfig from '../config/clientConfig.js';
const config = {
    vnp_TmnCode: 'ZIK7ILJ8',
    vnp_HashSecret: 'FJCUMALJBQCDQZCPXKPYUEUGHCTLZUGZ',
    vnp_Url: 'http://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
    vnp_Api: 'http://sandbox.vnpayment.vn/merchant_webapi/api/transaction',
    vnp_ReturnUrl: `${clientConfig.url}/profile`,
};
export default config;
