import Multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import express from 'express';
const uploadRouter = express.Router();
cloudinary.config({
    cloud_name: 'dgsumh8ih',
    api_key: '726416339718441',
    api_secret: 'n9z2-8LwGN8MPhbDadWYuMGN78U',
});
async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
        resource_type: 'auto',
    });
    return res;
}
const storage = new Multer.memoryStorage();
const upload = Multer({
    storage,
});
uploadRouter.post('/', upload.single('my_file'), async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
        const cldRes = await handleUpload(dataURI);
        res.status(200).json({
            success: true,
            url: cldRes.url,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
});
export default uploadRouter;
